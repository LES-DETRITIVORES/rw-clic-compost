export const schema = gql`
  type Geocoder {
    zip: String!
    address: String!
    longitude: String!
    latitude: String!
  }

  type Query {
    getLocation(zip: String!): Geocoder! @skipAuth
  }
`
