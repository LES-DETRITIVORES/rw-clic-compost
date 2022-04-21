export const schema = gql`
  type Customer {
    query: String!
    id: String!
  }

  type PaymentMethod {
    query: String!
    id: String!
  }

  type Payment {
    query: Int!
    id: String!
  }

  type Query {
    addCustomer(query: String!): Customer! @skipAuth
    addPaymentMethod(query: String!): PaymentMethod! @skipAuth
    addPayment(query: Int!): Payment! @skipAuth
  }
`
