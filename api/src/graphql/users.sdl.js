export const schema = gql`
  type User {
    id: Int!
    email: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
    userByEmail(email: String!): User @skipAuth
  }

  input CreateUserInput {
    email: String!
  }

  input UpdateUserInput {
    email: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @skipAuth
  }
`
