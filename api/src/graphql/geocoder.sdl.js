export const schema = gql`
  type Geocoder {
    query: String!
    address: String!
    longitude: String!
    latitude: String!
  }

  type Query {
    getLocation(query: String!): Geocoder! @skipAuth
  }
`
