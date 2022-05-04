export const schema = gql`
  type Customer {
    id: String!
  }

  type Card {
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

  input CreateCustomerInput {
    description: String
    email: String!
  }

  input CreateCardInput {
    customer: String!
    number: String!
    exp_month: Int!
    exp_year: Int!
    cvc: String!
  }

  type Query {
    addSEPAMethod(name: String!, email: String!, iban: String!): SEPAMethod! @skipAuth
    addPayment(query: Int!): Payment! @skipAuth
    getClientSecret(query: String!): ClientSecret! @skipAuth
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @skipAuth
    createCard(input: CreateCardInput!): Card! @skipAuth
  }
`
