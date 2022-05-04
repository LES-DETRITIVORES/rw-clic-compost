import { db } from 'src/lib/db'

export const subscriptions = () => {
  return db.subscription.findMany()
}

export const subscription = ({ id }) => {
  return db.subscription.findUnique({
    where: { id },
  })
}

export const createSubscription = ({ input }) => {
  return db.subscription.create({
    data: input,
  })
}

export const updateSubscription = ({ id, input }) => {
  return db.subscription.update({
    data: input,
    where: { id },
  })
}

export const deleteSubscription = ({ id }) => {
  return db.subscription.delete({
    where: { id },
  })
}
