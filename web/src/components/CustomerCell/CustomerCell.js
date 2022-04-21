export const QUERY = gql`
  query newCustomerQuery($query: String!) {
    customer: addCustomer(query: $query) {
      query,
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ customer }) => {
  return customer.id
}
