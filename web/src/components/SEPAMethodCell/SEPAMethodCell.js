export const QUERY = gql`
  query newSEPAMethodQuery($name: String!, $email: String!, $iban: String!) {
    sepaMethod: addSEPAMethod(name: $name, email: $email, iban: $iban) {
      iban
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ sepaMethod }) => {
  return sepaMethod.id
}
