import { Link, routes } from '@redwoodjs/router'

import Bookings from 'src/components/Booking/Bookings'

export const QUERY = gql`
  query FindBookings {
    bookings {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookings yet. '}
      <Link to={routes.newBooking()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookings }) => {
  return <Bookings bookings={bookings} />
}
