import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import BookingAdmin from 'src/components/Booking/BookingAdmin'

export const QUERY = gql`
  query FindBookingById($id: Int!) {
    booking: booking(id: $id) {
      id
      createdAt
      pickedAt
      timeslot
      user
      subscription
      firstname
      lastname
      email
      phone
      location
      details
      status
      updatedAt
    }
  }
`

const UPDATE_BOOKING_MUTATION = gql`
  mutation UpdateBookingMutation($id: Int!, $input: UpdateBookingInput!) {
    updateBooking(id: $id, input: $input) {
      id
      createdAt
      pickedAt
      timeslot
      user
      subscription
      firstname
      lastname
      email
      phone
      location
      details
      status
      updatedAt
    }
  }
`

export const Loading = () => <div>Recherche des contrats...</div>

export const Empty = () => <div>Aucun contrat en cours.</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

const onSave = (input, id) => {
  updateBooking({ variables: { id, input } })
}

export const Success = ({ booking }) => {
  const [updateBooking, { loading, error }] = useMutation(
    UPDATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Demande mise à jour')
        navigate(routes.bookings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  return <BookingAdmin 
          booking={booking}
          onSave={onSave}
          error={error}
          loading={loading} />
}
