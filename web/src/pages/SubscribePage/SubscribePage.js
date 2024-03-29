import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import {
  Form,
  Label,
  TextField,
  FormError,
  DateField,
  Submit,
} from '@redwoodjs/forms'
import {
  useStripe,
  useElements,
  IbanElement,
  CardElement,
} from '@stripe/react-stripe-js'
import { Tab } from '@headlessui/react'
import { useAuth } from '@redwoodjs/auth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GET_USER = gql`
  query GetUserQuery($email: String!) {
    user: userByEmail(email: $email) {
      id
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUserMutation($id: Int!) {
    user: deleteUser(id: $id) {
      id
    }
  }
`

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
    subscription: createSubscription(input: $input) {
      id
    }
  }
`

const EMAIL_SUBSCRIPTION = gql`
  mutation EmailSubscriptionMutation($id: Int!, $password: String!) {
    emailSubscription(id: $id, password: $password)
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

const CREATE_PERSON = gql`
  mutation CreatePersonMutation($input: CreatePersonInput!) {
    person: createPerson(input: $input) {
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

const CREATE_NOTE = gql`
  mutation CreateNoteMutation($input: CreateNoteInput!) {
    note: createNote(input: $input) {
      id
    }
  }
`

const SubscribePage = ({ u, f, n, c, e, p, l, m, o, s, r }) => {
  const [card, setCard] = useState(false)
  const [iban, setIban] = useState(false)
  const [coupon, setCoupon] = useState()
  const [submit, setSubmit] = useState(false)

  const { currentUser, signUp } = useAuth()
  const [getUser] = useLazyQuery(GET_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  const [createSubscription, { loading, error }] = useMutation(
    CREATE_SUBSCRIPTION,
    {
      onCompleted: (result) => {
        //console.log(JSON.stringify(result.subscription))
        toast.success('Abonnement ajouté.')
      },
    }
  )

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
      //toast.success('Usager ajouté.')
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
      toast.success('Organisation ajoutée.')
    },
  })

  const [createPerson] = useMutation(CREATE_PERSON, {
    onCompleted: (result) => {
      toast.success('Contact ajouté.')
    },
  })

  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted: (result) => {
      toast.success('Détails ajoutés.')
    },
  })

  const stripe = useStripe()
  const elements = useElements()

  const IBAN_STYLE = {
    base: {
      color: '#32325d',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
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
    },
  }

  const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ['SEPA'],
    placeholderCountry: 'FR',
    style: IBAN_STYLE,
  }

  const [deliverDate, setDeliverDate] = useState(
    delayDate(Date(Date.now()), u == 'particulier' ? 1 : 6)
  )

  const formatDate = (value) => {
    if (value) {
      return new Date(value).toISOString().substring(0, 10)
    }
  }

  function delayDate(date, delay) {
    var nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + delay)
    // return next day if date on weekend
    if (nextDate.getDay() == 6 || nextDate.getDay() == 0) {
      return delayDate(nextDate, 1)
    }
    return nextDate
  }

  const [subscription, setSubscription] = useState({
    profile: u,
    firstname: f,
    lastname: n,
    company: c,
    email: e,
    phone: p,
    location: l,
    meals: parseInt(m),
    service: s,
    rate: r,
    startedAt: '',
    card: '',
    iban: '',
    user: '',
  })

  const subscriptionSubmit = async (data) => {
    if (subscription.profile == 'particulier') {
      subscriptionIndividual(data)
    }
    if (subscription.profile == 'professionnel') {
      subscriptionProfessional(data)
    }
  }

  const subscriptionIndividual = async (data) => {
    setSubmit(true)
    let sub = subscription
    sub.startedAt = data.startedAt

    /* Save user for authentification */
    // Generate a random password on 6 digits (0-9)
    const password =
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString()

    // Check if user exist and delete it first
    const check = await getUser({ variables: { email: subscription.email } })
    if (check.data.user) {
      console.log('User already exist...', check.data.user.id)
      const old = await deleteUser({ variables: { id: check.data.user.id } })
      if (old) {
        console.log('User deleted!', JSON.stringify(old))
      }
    }

    // Sign up user
    const user = await signUp({
      username: subscription.email,
      password: password,
    })
    if (user) {
      // user is signed in automatically
      console.log(JSON.stringify(user))
      toast.success('Utilisateur ajouté')
      sub.user = user.id
    }

    /* Save customer on Stripe */
    const customer = await createCustomer({
      variables: {
        input: {
          description:
            subscription.firstname + ' ' + subscription.lastname.toUpperCase(),
          email: subscription.email,
        },
      },
    })
    console.log(JSON.stringify(customer))
    sub.customer = customer.data.customer.id

    /* Add CARD payment */
    if (elements.getElement(CardElement)) {
      /* Get customer secret */
      var client_secret = await getClientSecret({
        variables: {
          query: customer.data.customer.id,
        },
      })
      console.log(JSON.stringify(client_secret.data.customer.secret))

      /* Add card to customer */
      const card = await stripe.confirmCardSetup(
        client_secret.data.customer.secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name:
                subscription.firstname +
                ' ' +
                subscription.lastname.toUpperCase(),
              email: subscription.email,
            },
          },
        }
      )

      if (card.error) {
        // setError(`Payment failed ${payload.error.message}`);
        // setProcessing(false);
        // Show error to your customer.
        console.log('Error card:', card.error.message)
      } else {
        // setError(null);
        // setProcessing(false);
        // setSucceeded(true);
        console.log('Succeed card:', card.setupIntent.payment_method)
        toast.success('Carte bancaire ajoutée.')
        sub.card = card.setupIntent.payment_method
      }
    }

    /* Add IBAN payment */
    if (elements.getElement(IbanElement)) {
      /* Get customer secret */
      client_secret = await getClientSecret({
        variables: {
          query: customer.data.customer.id,
        },
      })
      console.log(JSON.stringify(client_secret.data.customer.secret))

      /* Add IBAN to customer */
      const sepa = await stripe.confirmSepaDebitSetup(
        client_secret.data.customer.secret,
        {
          payment_method: {
            sepa_debit: elements.getElement(IbanElement),
            billing_details: {
              name:
                subscription.firstname +
                ' ' +
                subscription.lastname.toUpperCase(),
              email: subscription.email,
            },
          },
        }
      )
      if (sepa.error) {
        // Show error to your customer.
        console.log('Error SEPA:', sepa.error.message)
      } else {
        console.log('Succeed SEPA:', sepa.setupIntent.payment_method)
        sub.iban = sepa.setupIntent.payment_method
        toast.success('Compte bancaire ajouté.')
        // Show a confirmation message to your customer.
        // The SetupIntent is in the 'succeeded' state.
      }
    }

    /* Save subscription */
    sub.rate = (
      parseFloat(sub.rate) *
      (coupon == 'RECUP40' ? 4 / 1.2 / parseFloat(sub.rate) : 1)
    ).toFixed(2) // apply coupon
    setSubscription(sub)
    sub = await createSubscription({ variables: { input: subscription } })
    console.log(JSON.stringify(sub))

    /* Send email subscription */
    emailSubscription({
      variables: { id: sub.data.subscription.id, password: password },
    })

    /* Send SMS subscription */
    // console.log(JSON.stringify(subscription))
    //SMSSubscription({ variables: { input: {text: "Abonnement prêt", from:'+1 207 705 5921', 'to': subscription.phone }} })

    /* Add new deal to pipedrive (CRM) */
    // Create organization
    const organization = {
      name:
        subscription.profile == 'particulier'
          ? subscription.firstname +
            ' ' +
            subscription.lastname.toUpperCase() +
            ' ' +
            '(Particulier)'
          : subscription.company,
    }
    const org = await createOrganization({ variables: { input: organization } })

    // Create deal
    const deal = {
      title: '#' + sub.data.subscription.id + ' - ' + organization.name,
      value: subscription.rate.toString(),
      orgId: org.data.organization.id,
      pipelineId: '8',
      stageId: '55',
      status: 'won',
    }
    console.log(deal)
    createDeal({ variables: { input: deal } })
    navigate(routes.confirm())
    setSubmit(false)
  }

  const subscriptionProfessional = async (data) => {
    setSubmit(true)
    let sub = subscription
    sub.startedAt = data.startedAt

    /* Save user for authentification */
    // Generate a random password on 6 digits (0-9)
    const password =
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString() +
      Math.floor(Math.random() * 10).toString()

    // Check if user exist and delete it first
    const check = await getUser({ variables: { email: subscription.email } })
    if (check.data.user) {
      console.log('User already exist...', check.data.user.id)
      const old = await deleteUser({ variables: { id: check.data.user.id } })
      if (old) {
        console.log('User deleted!', JSON.stringify(old))
      }
    }

    // Sign up user
    const user = await signUp({
      username: subscription.email,
      password: password,
    })
    if (user) {
      // user is signed in automatically
      console.log(JSON.stringify(user))
      toast.success('Utilisateur ajouté')
      sub.user = user.id
    }
    console.log('user:', JSON.stringify(user))

    /* Save subscription */
    setSubscription(sub)
    sub = await createSubscription({ variables: { input: subscription } })
    console.log('subscription:', JSON.stringify(subscription))

    /* Send email subscription */
    emailSubscription({
      variables: { id: sub.data.subscription.id, password: password },
    })

    /* Send SMS subscription */
    // console.log(JSON.stringify(subscription))
    //SMSSubscription({ variables: { input: {text: "Abonnement prêt", from:'+1 207 705 5921', 'to': subscription.phone }} })

    /* Add new deal to pipedrive (CRM) */
    // Create organization
    const organization = {
      name:
        subscription.profile == 'particulier'
          ? subscription.firstname +
            ' ' +
            subscription.lastname.toUpperCase() +
            ' ' +
            '(Particulier)'
          : subscription.company.toUpperCase(),
    }
    const org = await createOrganization({ variables: { input: organization } })
    console.log('organization:', JSON.stringify(org))

    //address: subscription.location,

    // Create person (contact)
    const person = {
      name: subscription.firstname + ' ' + subscription.lastname.toUpperCase(),
      orgId: org.data.organization.id,
      email: subscription.email,
      phone: subscription.phone,
    }
    const pr = await createPerson({ variables: { input: person } })
    console.log('person:', JSON.stringify(pr))

    // Create deal
    const deal = {
      title:
        '#' +
        sub.data.subscription.id +
        ' - ' +
        subscription.company.toUpperCase(),
      value: (subscription.rate * 52).toString(),
      orgId: org.data.organization.id,
      pipelineId: '10',
      stageId: '61',
      status: 'open',
    }
    const dl = await createDeal({ variables: { input: deal } })
    console.log('deal:', JSON.stringify(dl))

    // Add details to deal
    function rounded(num) {
      return (+(Math.round(num + 'e+2') + 'e-2')).toFixed(2)
    }
    let paymentMethod = subscription.card
      ? 'Carte bancaire'
      : 'Prélèvement SEPA'
    let startedAt = new Date(subscription.startedAt).toLocaleDateString('fr')
    let app_url = process.env.APP_URL + '/collecte'
    let txt =
      "<b>Numéro d'adhésion :</b> " +
      sub.data.subscription.id +
      '<br/>' +
      '<b>Société :</b> ' +
      subscription.company.toUpperCase() +
      '<br/>' +
      '<b>Adresse :</b> ' +
      subscription.location +
      '<br/>' +
      '<b>Contact :</b> ' +
      subscription.firstname +
      ' ' +
      subscription.lastname +
      '<br/>' +
      '<b>Tél :</b> ' +
      subscription.phone +
      '<br/>' +
      '<b>Mél :</b> ' +
      subscription.email +
      '<br/>' +
      '<hr>' +
      '<b>Couverts </b>: ' +
      subscription.meals +
      ' repas par semaine' +
      '<br/>' +
      '<b>Offre :</b> ' +
      subscription.service +
      '<br/>' +
      '<b>Tarif :</b> ' +
      rounded(subscription.rate) +
      ' € HT par collecte' +
      '<br/>' +
      '<b>Démarrage :</b> ' +
      startedAt

    const note = {
      content: txt,
      dealId: dl.data.deal.id,
      orgId: '',
      personId: '',
    }
    const nt = await createNote({ variables: { input: note } })
    console.log('note:', JSON.stringify(nt))

    navigate(routes.confirm())
    setSubmit(false)
  }

  return (
    <>
      <MetaTags
        title="Abonnement"
        description="Page d'abonnement avec validation du contrat et enregistrement du mode de réglement"
      />
      {subscription && (
        <div>
          <div>
            <div className="font-light inline-flex space-x-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              <Link
                to={routes.offer({
                  u: u,
                  l: l,
                  m: m,
                  f: f,
                  n: n,
                  c: c,
                  e: e,
                  p: p,
                  o: o,
                  s: s,
                  r: r,
                })}
                className="text-white"
              >
                Changer d'offre
                <div className="group-hover:bg-white w-full h-0.5 transition" />
              </Link>
            </div>
          </div>
          <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-black w-min mx-auto -rotate-2">
            <span className="bg-yellow-400 p-1 block w-min">
              Commencez&nbsp;aujourd'hui,
            </span>
            <span className="bg-yellow-400 p-1 block w-min mt-1">
              Payez&nbsp;plus&nbsp;tard&nbsp;!
            </span>
          </div>
          <div className="container mx-auto max-w-6xl font-sans">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                  <h1 className="uppercase font-bold text-lg text-center mb-6">
                    Contrat de tri des biodéchets
                  </h1>
                  <ul>
                    {subscription.profile == 'professionnel' && (
                      <li>
                        <span className="font-bold">Société : </span>
                        <span className="uppercase">
                          {subscription.company}
                        </span>
                      </li>
                    )}
                    <li>
                      <span className="font-bold">Contact : </span>
                      <span className="capitalize">
                        {subscription.firstname}
                      </span>{' '}
                      <span className="uppercase">{subscription.lastname}</span>
                    </li>
                    <li>
                      <span className="font-bold">Tél : </span>
                      <span className="">{subscription.phone}</span>
                    </li>
                    <li>
                      <span className="font-bold">Mél : </span>
                      <span className="">{subscription.email}</span>
                    </li>
                    <li>
                      <span className="font-bold">Adresse de collecte : </span>
                      <span className="">{subscription.location}</span>
                    </li>
                    <li>
                      <span className="font-bold">Prestation : </span>
                      <span className="">
                        Collecte et compostage des biodéchets alimentaires
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">Offre : </span>
                      <span className="">{subscription.service}</span>
                    </li>
                    <li>
                      <span className="font-bold">Tarif : </span>
                      {coupon == 'RECUP40' && (
                        <span className="line-through font-light text-sm mr-1">
                          {parseFloat(
                            subscription.rate *
                              (subscription.profile == 'particulier' ? 1.2 : 1)
                          ).toFixed(2)}{' '}
                          €
                        </span>
                      )}
                      <span
                        className={`${
                          coupon == 'RECUP40' ? 'text-orange-600 font-bold' : ''
                        }`}
                      >
                        {parseFloat(
                          subscription.rate *
                            (coupon == 'RECUP40'
                              ? 4 / 1.2 / subscription.rate
                              : 1) *
                            (subscription.profile == 'particulier' ? 1.2 : 1)
                        ).toFixed(2)}{' '}
                        € {subscription.profile == 'particulier' ? 'TTC' : 'HT'}{' '}
                        par collecte
                      </span>
                    </li>
                  </ul>
                  {/* Display mandate acceptance text. */}
                  {subscription.profile == 'particulier' && (
                    <>
                      <hr className="mt-2" />
                      <div className="text-xs block mt-2 text-justify">
                        En fournissant vos informations de paiement et en
                        confirmant ce paiement, vous autorisez (A) LES
                        DETRITIVORES et Stripe, notre prestataire de services de
                        paiement et/ou PPRO, son prestataire de services local,
                        à envoyer des instructions à votre banque pour débiter
                        votre compte et (B) votre banque à débiter votre compte
                        conformément à ces instructions. Vous avez, entre
                        autres, le droit de vous faire rembourser par votre
                        banque selon les modalités et conditions du contrat
                        conclu avec votre banque. La demande de remboursement
                        doit être soumise dans un délai de 8 semaines à compter
                        de la date à laquelle votre compte a été débité. Vos
                        droits sont expliqués dans une déclaration disponible
                        auprès de votre banque. Vous acceptez de recevoir des
                        notifications des débits à venir dans les 2 jours
                        précédant leur réalisation.
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <Toaster />
                <Form
                  onSubmit={subscriptionSubmit}
                  config={{ mode: 'onBlur' }}
                  error={error}
                  className="mx-auto font-sans"
                >
                  <FormError error={error} wrapperClassName="form-error" />
                  <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                    <p className="font-bold text-md mb-6 text-center">
                      Notre service est facturé chaque mois en fonction du
                      nombre de collectes réalisées : vous payez uniquement à
                      l'usage !
                    </p>
                    <hr />
                    <Label className="font-medium mt-6 block">
                      Date de démarrage souhaitée
                    </Label>
                    {subscription.profile == 'particulier' && (
                      <DateField
                        name="startedAt"
                        onChange={(date) =>
                          setDeliverDate(
                            delayDate(new Date(date.target.value), 0)
                          )
                        }
                        min={formatDate(delayDate(new Date(Date.now()), 1))}
                        value={formatDate(deliverDate)}
                        className="block text-center w-32 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      />
                    )}
                    {subscription.profile == 'professionnel' && (
                      <DateField
                        name="startedAt"
                        onChange={(date) =>
                          setDeliverDate(
                            delayDate(new Date(date.target.value), 0)
                          )
                        }
                        min={formatDate(delayDate(new Date(Date.now()), 6))}
                        value={formatDate(deliverDate)}
                        className="block text-center w-32 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      />
                    )}
                    {subscription.profile == 'particulier' && (
                      <>
                        <Label className="font-medium block mt-6">
                          Code de réduction
                        </Label>
                        <TextField
                          name="coupon"
                          value={coupon}
                          onChange={(e) =>
                            setCoupon(e.target.value.toUpperCase())
                          }
                          className="uppercase text-center block w-32 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                        />
                        {coupon == 'RECUP40' && (
                          <p className="font-medium text-orange-600">
                            Réduction appliquée de -40% sur le tarif de collecte
                          </p>
                        )}

                        <Label className="font-medium block mt-6">
                          Mode de réglement
                        </Label>
                        <Tab.Group defaultIndex={0}>
                          <Tab.List className="flex space-x-3">
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  'p-3 w-1/2 border-2 border-gray-500 text-gray-500 rounded-md hover:border-yellow-500 outline-none',
                                  selected
                                    ? 'bg-yellow-400 text-black font-bold border-none'
                                    : 'bg-none'
                                )
                              }
                            >
                              Carte bancaire
                            </Tab>
                            <div className="p-1 my-auto">ou</div>
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  'p-3 w-1/2 border-2 border-gray-500 text-gray-500 rounded-md hover:border-yellow-500 outline-none',
                                  selected
                                    ? 'bg-yellow-400 text-black font-bold border-none'
                                    : 'bg-none'
                                )
                              }
                            >
                              Prélèvement SEPA
                            </Tab>
                          </Tab.List>
                          <Tab.Panels className="mt-3">
                            <Tab.Panel>
                              Veuillez renseigner les informations de votre
                              carte :
                              <CardElement
                                onChange={(e) => {
                                  setCard(e.complete)
                                }}
                                options={{ hidePostalCode: true }}
                                placeholder="4242424242424242"
                                className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                              />
                            </Tab.Panel>
                            <Tab.Panel>
                              Veuillez renseigner votre IBAN :
                              <IbanElement
                                onChange={(e) => {
                                  setIban(e.complete)
                                }}
                                options={IBAN_ELEMENT_OPTIONS}
                                placeholder="FR1420041010050500013M02606"
                                className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                              />
                            </Tab.Panel>
                          </Tab.Panels>
                        </Tab.Group>
                      </>
                    )}
                  </div>
                  <div>
                    {subscription.profile == 'particulier' && (
                      <Submit
                        disabled={submit || !(card || iban)}
                        className={`sm:text-sm md:text-lg uppercase font-bold ${
                          !submit && (card || iban)
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-600 text-white'
                        } rounded-b-md p-4 w-full shadow-lg`}
                      >
                        {!submit
                          ? 'Envoyer la demande'
                          : 'Enregistrement en cours, veuillez patienter...'}
                      </Submit>
                    )}
                    {subscription.profile == 'professionnel' && (
                      <Submit
                        disabled={submit}
                        className={`sm:text-sm md:text-lg uppercase font-bold ${
                          !submit
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-600 text-white'
                        } rounded-b-md p-4 w-full shadow-lg`}
                      >
                        {!submit
                          ? 'Envoyer la demande'
                          : 'Enregistrement en cours, veuillez patienter...'}
                      </Submit>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SubscribePage
