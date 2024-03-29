import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useLazyQuery } from '@apollo/client'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import {
  Form,
  Label,
  TextAreaField,
  FormError,
  DateField,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import LoginCell from 'src/components/User/LoginCell'
import ContractCell from 'src/components/Subscription/ContractCell'
import SlotCell from 'src/components/Location/SlotCell/SlotCell'
import * as turf from '@turf/turf'

const GET_GEOCODER = gql`
  query GetGeocoderQuery($location: String!) {
    geocoder: location(query: $location) {
      query
      address
      longitude
      latitude
    }
  }
`

const GET_CONTRACT = gql`
  query GetContractQuery($user: Int!) {
    subscription: contract(user: $user) {
      id
      firstname
      lastname
      email
      phone
      location
    }
  }
`

const CREATE_BOOKING = gql`
  mutation CreateBookingMutation($input: CreateBookingInput!) {
    booking: createBooking(input: $input) {
      id
    }
  }
`

const EMAIL_BOOKING = gql`
  mutation EmailBookingMutation($id: Int!) {
    emailBooking(id: $id)
  }
`

const SMS_SUBSCRIPTION = gql`
  mutation SMSSubscriptionMutation($input: sendSMSInput!) {
    sendSMS(input: $input) {
      id
    }
  }
`

const BookPage = () => {
  const MAX_DISTANCE = 3
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  function timeslot(geocoder) {
    var from = turf.point([-0.548885, 44.856188])
    var to = turf.point([geocoder.longitude, geocoder.latitude])
    var options = { units: 'kilometers' }
    var distance = turf.distance(from, to, options)
    return distance
  }

  const [getGeocoder] = useLazyQuery(GET_GEOCODER, {
    onCompleted: (result) => {
      console.log(JSON.stringify(result.geocoder))
      return result.geocoder
    },
  })

  const [getContract, { loading, error }] = useLazyQuery(GET_CONTRACT, {
    onCompleted: (result) => {
      return result.subscription
    },
  })

  const [createBooking] = useMutation(CREATE_BOOKING, {
    onCompleted: (result) => {
      //console.log(JSON.stringify(result.booking))
      toast.success('Demande enregistrée.')
    },
  })

  const [emailBooking] = useMutation(EMAIL_BOOKING, {
    onCompleted: () => {
      toast.success('Mél de confirmation envoyé.')
    },
  })

  const [deliverDate, setDeliverDate] = useState(delayDate(Date(Date.now()), 1))
  const [submit, setSubmit] = useState(false)

  const formatDate = (value) => {
    if (value) {
      return new Date(value).toISOString().substring(0, 10)
    }
  }

  function delayDate(date, delay) {
    var nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + delay)
    // return next day if date on weekend
    if (nextDate.getDay() !== 3) {
      return delayDate(nextDate, 1)
    }
    return nextDate
  }

  const bookSubmit = async (data) => {
    setSubmit(true)

    /* Search subscription */
    const contract = await getContract({ variables: { user: currentUser.id } })
    const subscription = contract.data.subscription

    /* Search timeslot */
    const geocoder = await getGeocoder({
      variables: { location: subscription.location },
    })

    const bookingInput = {
      user: currentUser.id,
      subscription: subscription.id,
      pickedAt: data.pickedAt,
      timeslot:
        timeslot(geocoder.data.geocoder) <= MAX_DISTANCE
          ? '9h - 12h'
          : '12h - 15h',
      firstname: subscription.firstname,
      lastname: subscription.lastname,
      email: subscription.email,
      phone: subscription.phone,
      location: subscription.location,
      details: data.details,
      status: 'A collecter',
      updatedAt: new Date(),
    }
    //console.log(JSON.stringify(bookingInput))

    /* Save booking */
    const booking = await createBooking({ variables: { input: bookingInput } })
    //console.log(JSON.stringify(booking))

    /* Send email booking */
    emailBooking({ variables: { id: booking.data.booking.id } })

    /* Send SMS booking */
    /* TODO */

    navigate(routes.confirmBook())
  }

  return (
    <>
      <MetaTags
        title="Réservation"
        description="Page de réservation d'un créneau de collecte"
      />
      {currentUser && (
        <div>
          <div className="text-white text-right">
            <span className="text-sm font-light">
              [<LoginCell id={currentUser.id} />]
            </span>
            &nbsp;
            <Link
              className="underline cursor-pointer font-bold text-md"
              onClick={logOut}
            >
              Se déconnecter
            </Link>
          </div>
          <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-black w-min mx-auto -rotate-2">
            <span className="bg-yellow-400 p-1 block w-min">
              Réservez&nbsp;votre&nbsp;collecte,
            </span>
            <span className="bg-yellow-400 p-1 block w-min mt-1">
              On&nbsp;composte&nbsp;vos&nbsp;biodéchets&nbsp;!
            </span>
          </div>
          <div className="container mx-auto max-w-6xl font-sans">
            <div className="flex flex-col-reverse gap-8 md:flex-row ">
              <div className="md:w-1/2">
                <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                  <h1 className="uppercase font-bold text-lg text-center">
                    Votre contrat de tri des biodéchets
                  </h1>
                  <hr className="my-3 -mx-8" />
                  <ContractCell user={currentUser.id} />
                  <hr className="my-3 -mx-8" />
                  <p className="font-medium text-md text-center">
                    Le service est facturé pour chaque collecte réalisée :<br />{' '}
                    vous payez uniquement à l'usage !
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <Toaster />
                <Form
                  onSubmit={bookSubmit}
                  config={{ mode: 'onBlur' }}
                  error={error}
                  className="mx-auto font-sans"
                >
                  <FormError error={error} wrapperClassName="form-error" />
                  <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                    <Label className="font-medium block text-center">
                      Veuillez choisir un jour de collecte
                    </Label>
                    <DateField
                      name="pickedAt"
                      step="7"
                      onChange={(date) =>
                        setDeliverDate(
                          delayDate(new Date(date.target.value), 0)
                        )
                      }
                      min={formatDate(delayDate(new Date(Date.now()), 1))}
                      value={formatDate(deliverDate)}
                      className="block mx-auto text-center w-32 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                    />
                    <SlotCell user={currentUser.id} />
                    <Label className="font-medium mt-6 block text-center">
                      Précisions sur la collecte (code, sonnerie, etc.)
                    </Label>
                    <TextAreaField
                      name="details"
                      className="block mx-auto w-80 h-24 bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                    />
                  </div>
                  <div>
                    <Submit
                      disabled={submit}
                      className={`sm:text-sm md:text-lg uppercase font-bold ${
                        !submit
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-600 text-white'
                      } rounded-b-md p-4 w-full shadow-lg`}
                    >
                      Envoyer la demande
                    </Submit>
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

export default BookPage
