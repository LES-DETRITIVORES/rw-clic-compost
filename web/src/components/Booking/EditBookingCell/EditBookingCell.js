import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import BookingForm from 'src/components/Booking/BookingForm'

export const QUERY = gql`
  query EditBookingById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ booking }) => {
  const [updateBooking, { loading, error }] = useMutation(
    UPDATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Booking updated')
        navigate(routes.bookings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateBooking({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Booking {booking.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookingForm
          booking={booking}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
