import { Link, routes } from '@redwoodjs/router'

import Subscriptions from 'src/components/Subscription/Subscriptions'

export const QUERY = gql`
  query FindSubscriptions {
    subscriptions {
      id
      createdAt
      firstname
      lastname
      company
      email
      phone
      location
      meals
      service
      startedAt
      customer
      card
      iban
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No subscriptions yet. '}
      <Link to={routes.newSubscription()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ subscriptions }) => {
  return <Subscriptions subscriptions={subscriptions} />
}
