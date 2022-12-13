const stripe = require('stripe')(process.env.STRIPE_SECRET_TOKEN)
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const createCustomer = async ({ input }) => {
  const customer = await stripe.customers.create(input)
  return {
    id: customer.id,
  }
}

export const createCard = async ({ input }) => {
  const card = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: input.number,
      exp_month: input.exp_month,
      exp_year: input.exp_year,
      cvc: input.cvc,
    },
  })

  const paymentAttach = await stripe.paymentMethods.attach(card.id, {
    customer: input.customer,
  })

  return {
    id: card.id,
  }
}

export const addSEPAMethod = async ({ name, email, iban }) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'sepa_debit',
    sepa_debit: { iban: iban },
    billing_details: {
      name: name,
      email: email,
    },
  })

  const paymentAttach = await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: 'cus_LY4LysEO2dG6NP',
  })

  return {
    name: name,
    email: email,
    iban: iban,
    id: paymentMethod.id,
  }
}

export const getClientSecret = async ({ query }) => {
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card', 'sepa_debit'],
    customer: query,
  })

  return {
    secret: setupIntent.client_secret,
  }
}

function rounded(num) {
  return (+(Math.round(num + 'e+2') + 'e-2')).toFixed(2)
}

export const createPayment = async ({ input }) => {
  // Create a PaymentIntent with the order amount and currency
  console.log(parseInt(rounded(input.rate * 1.2) * 100))
  const paymentIntent = await stripe.paymentIntents.create({
    customer: input.customer, //'cus_LY4LysEO2dG6NP'
    payment_method: input.payment_method, // 'pm_1KtHvzDczmPm9BYQ4FcSDx6Y (SEPA) | pm_1KqyWNDczmPm9BYQubUV4LZn (CARD)'
    receipt_email: input.receipt, // 'admin@les-detritivores.co'
    amount: parseInt(rounded(input.rate * 1.2) * 100),
    currency: 'eur',
    confirm: true,
    off_session: true,
    payment_method_types: ['card', 'sepa_debit'],
  })

  return {
    id: paymentIntent.id,
  }
}

export const emailPayment = async ({ subscriptionId, bookingId }) => {
  const subscription = await db.subscription.findUnique({
    where: { id: subscriptionId },
  })
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
  })
  let paymentMethod = subscription.card ? 'Carte bancaire' : 'Prélèvement SEPA'
  let pickedAt = new Date(booking.pickedAt).toLocaleDateString('fr')
  const subject =
    'CLIC & COMPOST #' + booking.id + ' - Collecte terminée - ' + pickedAt
  const text =
    'Bonjour ' +
    subscription.firstname +
    ' !\n\n' +
    'Votre collecte est terminée !\n\n' +
    'Conformément à votre adhésion, nous avons réalisé le paiement suivant :' +
    '-----------------------------------------------------------------------\n' +
    "Numéro d'adhésion : " +
    subscription.id +
    '\n' +
    (subscription.profile == 'professionnel'
      ? 'Société : ' + subscription.company + '\n'
      : '') +
    'Contact : ' +
    subscription.firstname +
    ' ' +
    subscription.lastname +
    '\n' +
    'Offre : ' +
    subscription.service +
    '\n' +
    'Date de collecte : ' +
    pickedAt +
    '\n' +
    'Mode de réglement : ' +
    paymentMethod +
    '\n' +
    'Montant débité : ' +
    rounded(subscription.rate * 1.2) +
    ' € TTC' +
    '\n' +
    '-----------------------------------------------------------------------\n' +
    "N'hésitez pas à nous contacter pour toutes questions :\n" +
    'LES DETRITIVORES\n' +
    '65 quai de Brazza 33100 Bordeaux\n' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const html =
    'Bonjour ' +
    subscription.firstname +
    ' !<br/><br/>' +
    'Votre collecte est terminée !<br/><br/>' +
    'Conformément à votre adhésion, nous avons réalisé le paiement suivant :<br/>' +
    '<hr/>' +
    "Numéro d'adhésion : " +
    subscription.id +
    '<br/>' +
    (subscription.profile == 'professionnel'
      ? 'Société : ' + subscription.company + '<br/>'
      : '') +
    'Contact : ' +
    subscription.firstname +
    ' ' +
    subscription.lastname +
    '<br/>' +
    'Offre : ' +
    subscription.service +
    '<br/>' +
    'Date de collecte : ' +
    pickedAt +
    '<br/>' +
    'Mode de réglement : ' +
    paymentMethod +
    '<br/>' +
    'Montant débité : ' +
    rounded(subscription.rate * 1.2) +
    ' € TTC' +
    '<br/>' +
    '<hr/>' +
    "N'hésitez pas à nous contacter pour toutes questions :<br/>" +
    'LES DETRITIVORES<br/>' +
    '65 quai de Brazza 33100 Bordeaux<br/>' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const email = await sendEmail({
    to: subscription.email,
    bcc: [
      'bonjour@les-detritivores.co' /*, 'Développement commercial <ec52413f.les-detritivores.co@fr.teams.ms>'*/,
    ],
    subject,
    text,
    html,
  })
  return email.messageId
}
