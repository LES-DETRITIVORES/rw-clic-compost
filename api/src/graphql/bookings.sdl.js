export const schema = gql`
  type Booking {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    pickedAt: DateTime!
    user: Int!
    details: Int
    status: String
  }

  type Query {
    bookings: [Booking!]! @requireAuth
    booking(id: Int!): Booking @requireAuth
  }

  input CreateBookingInput {
    pickedAt: DateTime!
    user: Int!
    details: Int
    status: String
  }

  input UpdateBookingInput {
    pickedAt: DateTime
    user: Int
    details: Int
    status: String
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @requireAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
  }
`
