export const schema = gql`
  type Subscription {
    id: Int!
    createdAt: DateTime!
    profile: String
    company: String
    firstname: String
    lastname: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    rate: String
    startedAt: DateTime!
    customer: String
    card: String
    iban: String
    user: Int!
  }

  type Query {
    subscriptions: [Subscription!]! @requireAuth
    subscription(id: Int!): Subscription @requireAuth
    contract(user: Int!): Subscription @requireAuth
  }

  input CreateSubscriptionInput {
    firstname: String
    lastname: String
    profile: String
    company: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    rate: String
    startedAt: DateTime!
    customer: String
    card: String
    iban: String
    user: Int
  }

  input UpdateSubscriptionInput {
    firstname: String
    lastname: String
    profile: String
    company: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    rate: String
    startedAt: DateTime
    customer: String
    card: String
    iban: String
    user: Int
  }

  type Mutation {
    createSubscription(input: CreateSubscriptionInput!): Subscription!
      @skipAuth
    updateSubscription(
      id: Int!
      input: UpdateSubscriptionInput!
    ): Subscription! @skipAuth
    deleteSubscription(id: Int!): Subscription! @skipAuth
    emailSubscription(id: Int!): String! @skipAuth
  }
`
