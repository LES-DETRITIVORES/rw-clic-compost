export const schema = gql`
  type Subscription {
    id: Int!
    createdAt: DateTime!
    firstname: String
    lastname: String
    company: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    startedAt: DateTime!
  }

  type Query {
    subscriptions: [Subscription!]! @requireAuth
    subscription(id: Int!): Subscription @requireAuth
  }

  input CreateSubscriptionInput {
    firstname: String
    lastname: String
    company: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    startedAt: DateTime!
  }

  input UpdateSubscriptionInput {
    firstname: String
    lastname: String
    company: String
    email: String
    phone: String
    location: String
    meals: Int
    service: String
    startedAt: DateTime
  }

  type Mutation {
    createSubscription(input: CreateSubscriptionInput!): Subscription!
      @requireAuth
    updateSubscription(
      id: Int!
      input: UpdateSubscriptionInput!
    ): Subscription! @requireAuth
    deleteSubscription(id: Int!): Subscription! @requireAuth
  }
`
