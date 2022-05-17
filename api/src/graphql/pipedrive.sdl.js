export const schema = gql`
  type Deal {
    id: String!
  }

  type Organization {
    id: String!
  }

  input CreateDealInput {
    title: String!
    value: String!
    orgId: String!
    pipelineId: String!
    stageId: String!
    status: String!
  }

  input CreateOrganizationInput {
    name: String!
  }

  type Mutation {
    createDeal(input: CreateDealInput!): Deal! @skipAuth
    createOrganization(input: CreateOrganizationInput!): Organization! @skipAuth
  }
`
