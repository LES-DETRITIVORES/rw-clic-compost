import ZoneCell from 'src/components/Location/SlotCell/ZoneCell'

export const QUERY = gql`
  query FindLocationByUser($user: Int!) {
    subscription: contract(user: $user) {
      location
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Subscription not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ subscription, className }) => {
  return <ZoneCell query={subscription.location} className={className}></ZoneCell>
}
