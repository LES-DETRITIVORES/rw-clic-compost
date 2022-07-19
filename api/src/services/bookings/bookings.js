import { db } from 'src/lib/db'

export const bookings = () => {
  return db.booking.findMany()
}

export const booking = ({ id }) => {
  return db.booking.findUnique({
    where: { id },
  })
}

export const createBooking = ({ input }) => {
  return db.booking.create({
    data: input,
  })
}

export const updateBooking = ({ id, input }) => {
  return db.booking.update({
    data: input,
    where: { id },
  })
}

export const deleteBooking = ({ id }) => {
  return db.booking.delete({
    where: { id },
  })
}
