import {
  bookings,
  booking,
  createBooking,
  updateBooking,
  deleteBooking,
} from './bookings'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookings', () => {
  scenario('returns all bookings', async (scenario) => {
    const result = await bookings()

    expect(result.length).toEqual(Object.keys(scenario.booking).length)
  })

  scenario('returns a single booking', async (scenario) => {
    const result = await booking({ id: scenario.booking.one.id })

    expect(result).toEqual(scenario.booking.one)
  })

  scenario('creates a booking', async () => {
    const result = await createBooking({
      input: {
        pickedAt: '2022-07-22T19:18:52Z',
        timeslot: 'String',
        user: 3611685,
        subscription: 7199956,
        updatedAt: '2022-07-22T19:18:52Z',
      },
    })

    expect(result.pickedAt).toEqual('2022-07-22T19:18:52Z')
    expect(result.timeslot).toEqual('String')
    expect(result.user).toEqual(3611685)
    expect(result.subscription).toEqual(7199956)
    expect(result.updatedAt).toEqual('2022-07-22T19:18:52Z')
  })

  scenario('updates a booking', async (scenario) => {
    const original = await booking({ id: scenario.booking.one.id })
    const result = await updateBooking({
      id: original.id,
      input: { pickedAt: '2022-07-23T19:18:52Z' },
    })

    expect(result.pickedAt).toEqual('2022-07-23T19:18:52Z')
  })

  scenario('deletes a booking', async (scenario) => {
    const original = await deleteBooking({ id: scenario.booking.one.id })
    const result = await booking({ id: original.id })

    expect(result).toEqual(null)
  })
})
