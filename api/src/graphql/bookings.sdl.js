export const schema = gql`
  type Booking {
    id: Int!
    createdAt: DateTime!
    pickedAt: DateTime!
    timeslot: String!
    user: Int!
    subscription: Int!
    firstname: String
    lastname: String
    email: String
    phone: String
    location: String
    details: String
    status: String
    updatedAt: DateTime!
    payment: String
  }

  type Query {
    bookings: [Booking!]! @requireAuth
    bookingsByStatus(status: String!): [Booking!]! @requireAuth
    booking(id: Int!): Booking @requireAuth
  }

  input CreateBookingInput {
    pickedAt: DateTime!
    timeslot: String!
    user: Int!
    subscription: Int!
    firstname: String
    lastname: String
    email: String
    phone: String
    location: String
    details: String
    status: String
    updatedAt: DateTime
  }

  input UpdateBookingInput {
    pickedAt: DateTime
    timeslot: String
    user: Int
    subscription: Int
    firstname: String
    lastname: String
    email: String
    phone: String
    location: String
    details: String
    status: String
    updatedAt: DateTime
    payment: String
  }

  type Mutation {
    createBooking(input: CreateBookingInput!): Booking! @requireAuth
    updateBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
    deleteBooking(id: Int!): Booking! @requireAuth
    emailBooking(id: Int!): String! @requireAuth
    payBooking(id: Int!, input: UpdateBookingInput!): Booking! @requireAuth
  }
`
