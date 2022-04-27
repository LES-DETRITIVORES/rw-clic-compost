export const schema = gql`
  type Customer {
    query: String!
    id: String!
  }

  type PaymentMethod {
    query: String!
    id: String!
  }

  type SEPAMethod {
    name: String!
    email: String!
    iban: String!    
    id: String!
  }

  type Payment {
    query: Int!
    id: String!
  }

  type ClientSecret {
    secret: String!
  }

  type Query {
    addCustomer(query: String!): Customer! @skipAuth
    addPaymentMethod(query: String!): PaymentMethod! @skipAuth
    addSEPAMethod(name: String!, email: String!, iban: String!): SEPAMethod! @skipAuth
    addPayment(query: Int!): Payment! @skipAuth
    getClientSecret(query: String!): ClientSecret! @skipAuth
  }
`
