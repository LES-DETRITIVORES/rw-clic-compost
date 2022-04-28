export const schema = gql`
  type Geocoder {
    query: String!
    address: String!
    longitude: String!
    latitude: String!
  }

  type Location {
    id : String!
    place_name : String!
  }

  type Query {
    location(query: String!): Geocoder! @skipAuth
    locations(query: String!): [Location!]! @skipAuth
  }
`
