export const schema = gql`
  type Deal {
    id: String!
  }

  input CreateDealInput {
    title: String!
  }

  type Mutation {
    createDeal(input: CreateDealInput!): Deal! @skipAuth
  }
`
