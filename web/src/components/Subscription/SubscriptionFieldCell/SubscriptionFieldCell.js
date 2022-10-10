import Comboboxes from 'src/components/Comboboxes'

export const QUERY = gql`
  query FindSubscriptions {
    subscriptions {
      id
      firstname
      lastname
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ subscriptions, value, onChange, name, label }) => {
  return <Comboboxes
      options={subscriptions}
      value={value}
      onChange={onChange}
      name={name}
      label={label}
    />
}
