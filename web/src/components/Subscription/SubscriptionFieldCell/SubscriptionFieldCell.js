import Comboboxes from 'src/components/Comboboxes/Comboboxes'

export const QUERY = gql`
  query FindSubscriptionsByProfile($profile: String!) {
    subscriptions: subscriptionsByProfile(profile: $profile) {
      id
      firstname
      lastname
      location
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ subscriptions, value, onChange, name }) => {
  return (
    <Comboboxes
      options={subscriptions}
      value={value}
      onChange={onChange}
      name={name}
    />
  )
}
