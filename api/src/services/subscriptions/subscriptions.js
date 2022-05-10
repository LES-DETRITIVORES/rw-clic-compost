import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

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

export const emailSubscription = async ({ id }) => {
  const subscription = await db.subscription.findUnique({
    where: { id },
  })
  const subject = 'Abonnement confirmé'
  const text =
    'Merci, votre abonnement est confirmé.\n\n' +
    'A bientôt !'
  const html =
    'Merci, votre abonnement est confirmé.<br><br>' +
    'A bientôt !'
  const email = await sendEmail({ to: subscription.email, subject, text, html })
  // return email.messageId
  return "ok"
}
