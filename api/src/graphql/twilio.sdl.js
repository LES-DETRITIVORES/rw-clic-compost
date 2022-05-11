export const schema = gql`
  type SMS {
    id: String!
  }

  input sendSMSInput {
    text: String!
    from: String!
    to: String!
  }

  type Mutation {
    sendSMS(input: sendSMSInput!): SMS! @requireAuth
  }
`
