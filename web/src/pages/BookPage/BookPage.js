import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { Form, Label, TextAreaField, FormError, DatetimeLocalField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import LoginCell from 'src/components/User/LoginCell'
import ContractCell from 'src/components/Subscription/ContractCell'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
    subscription: createSubscription(input: $input) {
      id
    }
  }
`

const EMAIL_SUBSCRIPTION = gql`
  mutation EmailSubscriptionMutation($id: Int!) {
    emailSubscription(id: $id)
  }
`

const SMS_SUBSCRIPTION = gql`
  mutation SMSSubscriptionMutation($input: sendSMSInput!) {
    sendSMS(input: $input) {
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

const GET_CLIENT_SECRET = gql`
  query GetClientSecretQuery($query: String!) {
    customer: getClientSecret(query: $query) {
      secret
    }
  }
`

const CREATE_DEAL = gql`
  mutation CreateDealMutation($input: CreateDealInput!) {
    deal: createDeal(input: $input) {
      id
    }
  }
`

const CREATE_ORGANIZATION = gql`
  mutation CreateOrganizationMutation($input: CreateOrganizationInput!) {
    organization: createOrganization(input: $input) {
      id
    }
  }
`

const BookPage = () => {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  const [createSubscription, {loading, error}] = useMutation(CREATE_SUBSCRIPTION, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.subscription))
      toast.success('Abonnement ajouté.')
    },
  })

  const [emailSubscription] = useMutation(EMAIL_SUBSCRIPTION, {
    onCompleted: () => {
      toast.success('Mél de confirmation envoyé.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [SMSSubscription] = useMutation(SMS_SUBSCRIPTION, {
    onCompleted: () => {
      toast.success('SMS de confirmation envoyé.')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createCustomer] = useMutation(CREATE_CUSTOMER, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.customer))
      toast.success('Usager ajouté.')
    },
  })

  const [getClientSecret] = useLazyQuery(GET_CLIENT_SECRET, {
    onCompleted: (result) => {
      console.log(JSON.stringify(result))
    },
  })

  const [createDeal] = useMutation(CREATE_DEAL, {
    onCompleted: (result) => {
      toast.success('Affaire ajoutée.')
    },
  })

  const [createOrganization] = useMutation(CREATE_ORGANIZATION, {
    onCompleted: (result) => {
      //toast.success('Organisation ajoutée.')
    },
  })

  const [deliverDate, setDeliverDate] = useState(delayDate(Date(Date.now()), 2))
  const [coupon, setCoupon] = useState()

  const formatDate = (value) => {
    if (value) {
      return new Date(value).toISOString().substring(0,10)
    }
  }

  function delayDate(date, delay) {
    var nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + delay);
    // return next day if date on weekend
    if (nextDate.getDay() == 6 || nextDate.getDay() == 0) { return delayDate(nextDate, 1) }
    return nextDate;
  }

  const [subscription, setSubscription] = useState({
    profile: '',
    firstname : '',
    lastname : '',
    company: '',
    email: '',
    phone : '',
    location : '',
    meals : '',
    service : '',
    rate : '',
    startedAt : '',
    card: '',
    iban: ''
  })

  const subscriptionSubmit = async (data) => {
    let sub = subscription
    sub.startedAt = data.startedAt
    
    /* Save customer */
    const customer = await createCustomer({ variables: {
      input: {
        description: subscription.firstname + ' ' + subscription.lastname.toUpperCase(),
        email: subscription.email
      }
    }})
    console.log(JSON.stringify(customer))
    sub.customer = customer.data.customer.id

    /* Save subscription */
    sub.rate = (parseFloat(sub.rate)*(coupon == "RECUP40" ? 4/1.2/parseFloat(sub.rate) : 1)).toFixed(2) // apply coupon
    setSubscription(sub)
    sub = await createSubscription({ variables: { input: subscription } })
    console.log(JSON.stringify(sub))

    /* Send email subscription */
    emailSubscription({ variables: { id: sub.data.subscription.id } })

    /* Send SMS subscription */
    // console.log(JSON.stringify(subscription))
    //SMSSubscription({ variables: { input: {text: "Abonnement prêt", from:'+1 207 705 5921', 'to': subscription.phone }} })

    /* Add new deal to pipedrive (CRM) */
    // Create organization
    const organization = {
      name: subscription.profile == "particulier" ? subscription.firstname + ' ' + subscription.lastname.toUpperCase() + ' ' + '(Particulier)': subscription.company
    }
    const org = await createOrganization({ variables: { input: organization }})

    // Create deal
    const deal = {
      title: '#' + sub.data.subscription.id + ' - ' + organization.name,
      value: (subscription.rate).toString(),
      orgId: org.data.organization.id,
      pipelineId: '8',
      stageId: '55',
      status: 'won'
    }
    console.log(deal)
    createDeal({ variables: { input: deal }})  

    navigate(routes.confirm())
  }

  return (
    <>
      <MetaTags title="Réservation" description="Page de réservation d'un créneau de collecte" />
      { subscription &&
      <div>
        <div className="text-white text-right">
          <span className="text-sm font-light">[<LoginCell id={currentUser.id} />]</span>&nbsp;
          <Link className="underline cursor-pointer font-bold text-md" onClick={logOut}>Se déconnecter</Link>
        </div>
        <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-black w-min mx-auto -rotate-2">
          <span className="bg-yellow-400 p-1 block w-min">Réservez&nbsp;votre&nbsp;créneau,</span>
          <span className="bg-yellow-400 p-1 block w-min mt-1">On&nbsp;composte&nbsp;vos&nbsp;biodéchets&nbsp;!</span>
        </div>
        <div className="container mx-auto max-w-6xl font-sans">
          <div className="flex flex-col-reverse gap-8 md:flex-row ">
            <div className="md:w-1/2">
              <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                <h1 className="uppercase font-bold text-lg text-center">Votre contrat de tri des biodéchets</h1>
                <hr className="my-3 -mx-8"/>
                <ContractCell user={currentUser.id}/>
                <ul>
                  {
                    subscription.profile == "professionnel" &&
                    <li><span className="font-bold">Société : </span><span className="uppercase">{subscription.company}</span></li>
                  }
                  <li><span className="font-bold">Date : </span><span className="capitalize">{subscription.startedAt}</span></li>
                  <li><span className="font-bold">Contact : </span><span className="capitalize">{subscription.firstname}</span> <span className="uppercase">{subscription.lastname}</span></li>
                  <li><span className="font-bold">Tél : </span><span className="">{subscription.phone}</span></li>
                  <li><span className="font-bold">Mél : </span><span className="">{subscription.email}</span></li>
                  <li><span className="font-bold">Adresse de collecte : </span><span className="">{subscription.location}</span></li>
                  <li><span className="font-bold">Prestation : </span><span className="">Collecte et compostage des biodéchets alimentaires</span></li>
                  <li><span className="font-bold">Offre : </span><span className="">{subscription.service}</span></li>
                  <li><span className="font-bold">Tarif : </span>
                    {coupon == "RECUP40" &&
                      <span className="line-through font-light text-sm mr-1">
                        {parseFloat(subscription.rate*(subscription.profile == "particulier" ? 1.2 : 1)).toFixed(2)} €
                      </span>
                    }
                    <span className={`${coupon == "RECUP40" ? 'text-orange-600 font-bold' : ''}`}>
                      {parseFloat(subscription.rate*(coupon == "RECUP40" ? 4/1.2/subscription.rate : 1)*(subscription.profile == "particulier" ? 1.2 : 1)).toFixed(2)} € {subscription.profile == "particulier" ? 'TTC' : 'HT'} par collecte
                    </span>
                  </li>
                  <li><span className="font-bold">Mode de réglement : </span><span className="">{subscription.card}</span></li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <Toaster />
              <Form onSubmit={subscriptionSubmit} config={{ mode: 'onBlur' }} error={error} 
                    className="mx-auto font-sans">
                <FormError error={error} wrapperClassName="form-error" />
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <p className="font-medium text-md text-center">
                    Le service est facturé pour chaque collecte réalisée :<br/> vous payez uniquement à l'usage !
                  </p>
                  <hr className="my-3 -mx-8"/>
                  <Label className="font-medium block text-center">
                    Date et heure de collecte
                  </Label>
                  <DatetimeLocalField 
                    name="startedAt" 
                    onChange={(date) => setDeliverDate(delayDate(new Date(date.target.value),0))} min={formatDate(delayDate(new Date(Date.now()),1))} value={formatDate(deliverDate)} 
                    className="block mx-auto text-center w-48 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium mt-6 block text-center">
                    Précisions sur la collecte (code, sonnerie, etc.)
                  </Label>
                  <TextAreaField 
                    name="details" 
                    className="block mx-auto w-80 h-24 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                </div>
                <div>
                  <Submit
                    disabled={loading}
                    className={`sm:text-sm md:text-lg uppercase font-bold ${(!loading) ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-white'} rounded-b-md p-4 w-full shadow-lg`}>Réserver</Submit>
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

export default BookPage
