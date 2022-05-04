import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { Form, Label, TextField, FormError, DateField, Submit } from '@redwoodjs/forms'

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
      toast.success('Nouvel usager ajouté !')
    },
  })

  const [createCard] = useMutation(CREATE_CARD, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.card))
      toast.success('Nouvelle carte de paiement ajoutée !')
    },
  })

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
        email: subscription.email}
      }
    })
    console.log(JSON.stringify(customer))

    /* Add card to customer */
    const card = await createCard({ variables: { 
      input: {
        customer: customer.data.customer.id,
        number: data.card,
        exp_month: 4,
        exp_year: 2023,
        cvc: '314'}
      }
    })
    console.log(JSON.stringify(card))

    /* Add IBAN * /
    // TODO...

    /* Save subscription */
    var sub = subscription
    sub.startedAt = data.startedAt
    sub.customer = customer.data.customer.id
    sub.card = card.data.card.id
    sub.iban = data.iban
    // console.log(JSON.stringify(sub))
    createSubscription({ variables: { input: sub } })
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
                  <Label className="font-medium block">
                    Numéro carte bleu
                  </Label>
                  <TextField name="card" placeholder="4242424242424242" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    IBAN
                  </Label>
                  <TextField name="iban" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
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
