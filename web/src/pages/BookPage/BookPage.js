import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { Form, Label, TextAreaField, FormError, DateField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import LoginCell from 'src/components/User/LoginCell'
import ContractCell from 'src/components/Subscription/ContractCell'
import SlotCell from 'src/components/Location/SlotCell/SlotCell'

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

  const [deliverDate, setDeliverDate] = useState(delayDate(Date(Date.now()), 1))

  const formatDate = (value) => {
    if (value) {
      return new Date(value).toISOString().substring(0,10)
    }
  }

  function delayDate(date, delay) {
    var nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + delay);
    // return next day if date on weekend
    if (nextDate.getDay() !== 3) { return delayDate(nextDate, 1) }
    return nextDate;
  }

  const bookSubmit = async (data) => {
    let booking =  {
      user : currentUser.id,
      pickedAt : data.pickedAt,
      details : data.details,
      status : ''
    }
    console.log(JSON.stringify(booking))

    /* Save booking */
    //book = await createBooking({ variables: { input: booking } })

    /* Send email booking */
    //emailBooking({ variables: { id: book.data.booking.id } })

     /* Send SMS booking */
     /* TODO */

    //navigate(routes.confirmBook())
  }

  return (
    <>
      <MetaTags title="Réservation" description="Page de réservation d'un créneau de collecte" />
      { currentUser &&
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
                <hr className="my-3 -mx-8"/>
                <p className="font-medium text-md text-center">
                    Le service est facturé pour chaque collecte réalisée :<br/> vous payez uniquement à l'usage !
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <Toaster />
              <Form onSubmit={bookSubmit} config={{ mode: 'onBlur' }} error={error}
                    className="mx-auto font-sans">
                <FormError error={error} wrapperClassName="form-error" />
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block text-center">
                    Veuillez choisir un jour de collecte
                  </Label>
                  <DateField
                    name="pickedAt"
                    step="7"
                    onChange={(date) => setDeliverDate(delayDate(new Date(date.target.value),0))} min={formatDate(delayDate(new Date(Date.now()),1))} value={formatDate(deliverDate)}
                    className="block mx-auto text-center w-32 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <SlotCell user={currentUser.id} />
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
