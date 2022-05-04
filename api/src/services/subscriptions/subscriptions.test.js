import {
  subscriptions,
  subscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from './subscriptions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('subscriptions', () => {
  scenario('returns all subscriptions', async (scenario) => {
    const result = await subscriptions()

    expect(result.length).toEqual(Object.keys(scenario.subscription).length)
  })

  scenario('returns a single subscription', async (scenario) => {
    const result = await subscription({ id: scenario.subscription.one.id })

    expect(result).toEqual(scenario.subscription.one)
  })

  scenario('creates a subscription', async () => {
    const result = await createSubscription({
      input: { startedAt: '2022-05-04T14:55:39Z' },
    })

    expect(result.startedAt).toEqual('2022-05-04T14:55:39Z')
  })

  scenario('updates a subscription', async (scenario) => {
    const original = await subscription({ id: scenario.subscription.one.id })
    const result = await updateSubscription({
      id: original.id,
      input: { startedAt: '2022-05-05T14:55:39Z' },
    })

    expect(result.startedAt).toEqual('2022-05-05T14:55:39Z')
  })

  scenario('deletes a subscription', async (scenario) => {
    const original = await deleteSubscription({
      id: scenario.subscription.one.id,
    })

    const result = await subscription({ id: original.id })

    expect(result).toEqual(null)
  })
})
