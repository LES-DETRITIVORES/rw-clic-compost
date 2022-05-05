import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { Form, Label, TextField, FormError, DateField, Submit } from '@redwoodjs/forms'
import { useStripe, useElements, IbanElement } from '@stripe/react-stripe-js';

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
    subscription: createSubscription(input: $input) {
      id
    }
  }
`

const CREATE_CUSTOMER = gql`
  mutation CreateCustomerMutation($input: CreateCustomerInput!) {
    customer: createCustomer(input: $input) {
      id
    }
  }
`

const CREATE_CARD = gql`
  mutation CreateCardMutation($input: CreateCardInput!) {
    card: createCard(input: $input) {
      id
    }
  }
`

const GET_CLIENT_SECRET = gql`
  query GetClientSecretQuery($query: String!) {
    customer: getClientSecret(query: $query) {
      secret
    }
  }
`

const SubscribePage = ({f, n, c, e, p, l, m, s}) => {
  const [createSubscription, {loading, error}] = useMutation(CREATE_SUBSCRIPTION, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.subscription))
      toast.success('Merci pour votre abonnement !')
    },
  })

  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.customer))
      toast.success('Nouvel usager ajouté.')
    },
  })

  const [createCard] = useMutation(CREATE_CARD, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.card))
      toast.success('Nouvelle carte bancaire ajoutée.')
    },
  })

  const [getClientSecret] = useLazyQuery(GET_CLIENT_SECRET, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result))
      toast.success('Nouveau compte bancaire ajouté.')
    },
  })

  const stripe = useStripe();
  const elements = useElements();

  const IBAN_STYLE = {
    base: {
      color: '#32325d',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      ':-webkit-autofill': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
      ':-webkit-autofill': {
        color: '#fa755a',
      },
    }
  };

  const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ['SEPA'],
    placeholderCountry: 'FR',
    style: IBAN_STYLE
  };

  const [subscription, setSubscription] = useState({
    firstname : f,
    lastname : n,
    company: c,
    email: e,
    phone : p,
    location : l,
    meals : parseInt(m),
    service : s,
    startedAt : '',
    card: '',
    iban: ''
  })

  const subscriptionSubmit = async (data) => {
    /* Save customer */    
    const customer = await createCustomer({ variables: { 
      input: {
        description: subscription.firstname + ' ' + subscription.lastname.toUpperCase(), 
        email: subscription.email
      }
    }})
    console.log(JSON.stringify(customer))
    
    /* Add card to customer */
    const card = await createCard({ variables: { 
      input: {
        customer: customer.data.customer.id,
        number: data.card,
        exp_month: 4,
        exp_year: 2023,
        cvc: '314'
      }
    }})
    console.log(JSON.stringify(card))

    /* Add IBAN to customer */
    const client_secret = await getClientSecret({ variables: { 
      query: customer.data.customer.id
      }
    })
    console.log(JSON.stringify(client_secret.data.customer.secret))
    const sepa = await stripe.confirmSepaDebitSetup(client_secret.data.customer.secret, {
      payment_method: {
        sepa_debit: elements.getElement(IbanElement),
        billing_details: {
          name: subscription.firstname + ' ' + subscription.lastname.toUpperCase(),
          email: subscription.email,
        },
      }
    });
    if (sepa.error) {
      // Show error to your customer.
      console.log("Error SEPA:", sepa.error.message);
    } else {
      console.log("Succeed SEPA:", sepa.setupIntent.payment_method)
      // Show a confirmation message to your customer.
      // The SetupIntent is in the 'succeeded' state.
    }

    /* Save subscription */
    var sub = subscription
    sub.startedAt = data.startedAt
    sub.customer = customer.data.customer.id
    sub.card = card.data.card.id
    sub.iban = sepa.setupIntent.payment_method
    setSubscription(sub)
    console.log(JSON.stringify(subscription))
    createSubscription({ variables: { input: subscription } })
  }
  
  return (
    <>
      <MetaTags title="Subscribe" description="Subscribe page" />
      { subscription &&
      <div>
        <div>
          <Link to={routes.offer({l:l, m:m, f:f, n:n, c:c, e:e, p:p, s:s})}>&lt; Changer d'offre</Link>
        </div>
        <div className="font-medium text-center text-2xl md:text-3xl mt-16">
          Validez votre contrat de collecte
        </div>
        <div className="container mx-auto max-w-6xl font-sans">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                <h1 className="uppercase font-bold text-lg text-center mb-6">Contrat de tri des biodéchets</h1>
                <ul>
                  <li><span className="font-bold">Société : </span><span className="uppercase">{subscription.company}</span></li>
                  <li><span className="font-bold">Contact : </span><span className="capitalize">{subscription.firstname}</span> <span className="uppercase">{subscription.lastname}</span></li>
                  <li><span className="font-bold">Tél : </span><span className="">{subscription.phone}</span></li>
                  <li><span className="font-bold">Mél : </span><span className="">{subscription.email}</span></li>
                  <li><span className="font-bold">Adresse de collecte : </span><span className="">{subscription.location}</span></li>
                  <li><span className="font-bold">Prestation : </span><span className="lowercase">Collecte et compostage de {subscription.service}</span></li>
                </ul>
              </div>
              {/* Display mandate acceptance text. */}
              <div className="text-xs block mt-6 text-justify">
                En fournissant vos informations de paiement et en confirmant ce paiement, vous autorisez (A) LES DETRITIVORES et Stripe, notre prestataire de services de paiement et/ou PPRO, son prestataire de services local, à envoyer des instructions à votre banque pour débiter votre compte et (B) votre banque à débiter votre compte conformément à ces instructions. Vous avez, entre autres, le droit de vous faire rembourser par votre banque selon les modalités et conditions du contrat conclu avec votre banque. La demande de remboursement doit être soumise dans un délai de 8 semaines à compter de la date à laquelle votre compte a été débité. Vos droits sont expliqués dans une déclaration disponible auprès de votre banque. Vous acceptez de recevoir des notifications des débits à venir dans les 2 jours précédant leur réalisation.
              </div>
            </div>
            <div>
              <Toaster />
              <Form onSubmit={subscriptionSubmit} config={{ mode: 'onBlur' }} error={error} className="container mx-auto font-sans">
                <FormError error={error} wrapperClassName="form-error" />
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block">
                    Date de démarrage
                  </Label>
                  <DateField name="startedAt" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>

                  <Label className="font-medium block mt-6">
                    Carte bancaire
                  </Label>
                  <TextField name="card" placeholder="4242424242424242" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>

                  <Label className="font-medium block mt-6">IBAN</Label>
                  <IbanElement placeholder="FR1420041010050500013M02606" options={IBAN_ELEMENT_OPTIONS} className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>        
                </div>
                <div>
                  <Submit
                    disabled={loading}
                    className="sm:text-sm md:text-lg uppercase font-bold bg-blue-600 rounded-b-md p-4 text-white w-full shadow-lg">S'abonner</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default SubscribePage
