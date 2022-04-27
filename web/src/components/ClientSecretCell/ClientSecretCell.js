export const QUERY = gql`
  query getClientSecretQuery($query: String!) {
    clientSecret: getClientSecret(query: $query) {
      secret
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ clientSecret }) => {
  return <div>{JSON.stringify(clientSecret)}</div>
}
