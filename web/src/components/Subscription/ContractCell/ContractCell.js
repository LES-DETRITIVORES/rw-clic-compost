import Subscription from 'src/components/Subscription/Subscription'

export const QUERY = gql`
  query FindSubscriptionByUser($user: Int!) {
    subscription: contract(user: $user) {
      id
      createdAt
      profile
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
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Subscription not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ subscription }) => {
  return <Subscription subscription={subscription} />
}
