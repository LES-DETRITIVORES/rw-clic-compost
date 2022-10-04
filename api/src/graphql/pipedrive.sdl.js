export const schema = gql`
  type Deal {
    id: String!
  }

  type Organization {
    id: String!
  }

  type Person {
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

  input CreatePersonInput {
    name: String!
    orgId: String!
    email: String!
    phone: String!
  }

  type Mutation {
    createDeal(input: CreateDealInput!): Deal! @skipAuth
    createOrganization(input: CreateOrganizationInput!): Organization! @skipAuth
    createPerson(input: CreatePersonInput!): Person! @skipAuth
  }
`
