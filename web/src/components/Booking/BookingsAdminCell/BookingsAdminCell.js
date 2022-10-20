import { Link, routes } from '@redwoodjs/router'

import BookingsAdmin from 'src/components/Booking/BookingsAdmin'

export const QUERY = gql`
  query FindBookingsByStatus($status: String!) {
    bookings: bookingsByStatus(status: $status) {
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
      payment
    }
  }
`

export const Loading = () => <div>Chargement des données...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'Aucune demande en cours.'}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookings, callback }) => {
  return <BookingsAdmin bookings={bookings} callback={callback} />
}
