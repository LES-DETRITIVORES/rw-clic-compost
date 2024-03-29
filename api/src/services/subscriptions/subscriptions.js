import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { logger } from 'src/lib/logger'

export const subscriptions = () => {
  return db.subscription.findMany()
}

export const subscriptionsByProfile = ( { profile } ) => {
  return db.subscription.findMany(
    {
      where: { profile : profile }
    }
  )
}

export const subscription = ({ id }) => {
  return db.subscription.findUnique({
    where: { id },
  })
}

export const contract = ({ user }) => {
  return db.subscription.findFirst({
    where: { user : user },
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

export const emailSubscription = async ({ id, password }) => {
  function rounded(num) {
    return ((+(Math.round(num + "e+2") + "e-2")).toFixed(2))
  }

  const subscription = await db.subscription.findUnique({
    where: { id },
  })
  let paymentMethod = subscription.card ? 'Carte bancaire' : 'Prélèvement SEPA'
  let startedAt = new Date(subscription.startedAt).toLocaleDateString("fr")
  let app_url = process.env.APP_URL + '/collecte'
  const subject = 'CLIC & COMPOST #' + subscription.id + ' - Vous êtes prêts à trier vos biodéchets !'
  const text =
    'Bienvenu ' + subscription.firstname + ' !\n\n' +
    'La coopérative inclusive LES DETRITIVORES est heureuse de vous compter parmi les pionniers du tri des biodéchets :)\n\n' +
    'Voici un récapitulatif de votre inscription :\n' +
    '------------------------------------------------------\n' +
    'Numéro d\'adhésion : ' + subscription.id + '\n' +
    (subscription.profile == 'professionnel' ? 'Société : ' + subscription.company + '\n' : '') +
    'Contact : ' + subscription.firstname + ' ' + subscription.lastname + '\n' +
    'Tél : ' + subscription.phone + '\n' +
    'Mél : ' + subscription.email + '\n' +
    'Adresse de collecte : ' + subscription.location + '\n' +
    'Offre : ' + subscription.service + '\n' +
    'Tarif : ' + rounded(subscription.rate*(subscription.profile == 'particulier' ? 1.2 : 1)) + ' € ' + (subscription.profile == 'particulier' ? 'TTC' : 'HT') + ' par collecte' + '\n' +
    'Mode de réglement : ' + paymentMethod + '\n' +
    'Date de démarrage : ' + startedAt + '\n' +
    '-------------------------------------------------------\n' +
    'ESPACE USAGER : ' + app_url + '\n' +
    'CODE DE CONNEXION : ' + password + '\n' +
    '-------------------------------------------------------\n' +
    'N\'hésitez pas à nous contacter pour toutes questions :\n' +
    'LES DETRITIVORES\n' +
    '65 quai de Brazza 33100 Bordeaux\n' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const html =
    'Bienvenu ' + subscription.firstname + ' !<br/><br/>' +
    'La coopérative inclusive LES DETRITIVORES est heureuse de vous compter parmi les pionniers du tri des biodéchets :)<br/><br/>' +
    'Voici un récapitulatif de votre inscription :<br/>' +
    '<hr/>' +
    'Numéro d\'adhésion : ' + subscription.id + '<br/>' +
    (subscription.profile == 'professionnel' ? 'Société : ' + subscription.company + '<br/>' : '') +
    'Contact : ' + subscription.firstname + ' ' + subscription.lastname + '<br/>' +
    'Tél : ' + subscription.phone + '<br/>' +
    'Mél : ' + subscription.email + '<br/>' +
    'Adresse de collecte : ' + subscription.location + '<br/>' +
    'Offre : ' + subscription.service + '<br/>' +
    'Tarif : ' + rounded(subscription.rate*(subscription.profile == 'particulier' ? 1.2 : 1)) + ' € ' + (subscription.profile == 'particulier' ? 'TTC' : 'HT') + ' par collecte' + '<br/>' +
    'Mode de réglement : ' + paymentMethod + '<br/>' +
    'Date de démarrage : ' + startedAt + '<br/>' +
    '<hr/>' +
    'ESPACE USAGER : <a href=' + app_url + '>'+ app_url + '</a><br/>' +
    'CODE DE CONNEXION : ' + password + '<br/>' +
    '<hr/>' +
    'N\'hésitez pas à nous contacter pour toutes questions :<br/>' +
    'LES DETRITIVORES<br/>' +
    '65 quai de Brazza 33100 Bordeaux<br/>' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const email = await sendEmail({ to: subscription.email, bcc: ['bonjour@les-detritivores.co' /*, 'Développement commercial <ec52413f.les-detritivores.co@fr.teams.ms>'*/], subject, text, html })
  return email.messageId
}
