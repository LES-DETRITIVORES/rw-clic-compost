export const schema = gql`
  type SMS {
    query: String!
    id: String!
  }

  type Query {
    sendSMS(query: String!): SMS! @skipAuth
  }
`
