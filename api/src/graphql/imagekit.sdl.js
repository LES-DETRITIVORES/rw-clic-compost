export const schema = gql`
  type Image {
    url: String!
  }

  type Query {
    image(query: String!): Image! @skipAuth
  }
`