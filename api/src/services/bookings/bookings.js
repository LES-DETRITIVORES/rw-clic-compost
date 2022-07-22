import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

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

export const emailBooking = async ({ id }) => {
  const booking = await db.booking.findUnique({
    where: { id },
  })
  let pickedAt = new Date(booking.pickedAt).toLocaleDateString("fr")
  const subject = 'CLIC & COMPOST #' + booking.id + ' - Nouvelle demande de collecte - ' + pickedAt
  const text =
    'Bonjour ' + booking.firstname + ' !\n\n' +
    'Votre demande de collecte est bien enregistrée :\n' +
    '-------------------------------------------------------\n' +
    'Adresse : ' + booking.location + '\n' +
    'Précisions : ' + booking.details + '\n' +
    'Date de collecte : ' + pickedAt + '\n' +
    'Créneau : ' + booking.timeslot + '\n' +
    '-------------------------------------------------------\n\n' +
    'Contact : ' + booking.firstname + ' ' + booking.lastname + '\n' +
    'Tél : ' + booking.phone + '\n' +
    'Mél : ' + booking.email + '\n' +
    '-------------------------------------------------------\n\n' +
    'N\'hésitez pas à nous contacter pour toutes questions :\n' +
    'LES DETRITIVORES\n' +
    '65 quai de Brazza 33100 Bordeaux\n' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const html =
    'Bonjour ' + booking.firstname + ' !<br/><br/>' +
    'Votre demande de collecte est bien enregistrée :<br/>' +
    '<hr/>' +
    'Adresse : ' + booking.location + '<br/>' +
    'Précisions : ' + booking.details + '<br/>' +
    'Date de collecte : ' + pickedAt + '<br/>' +
    'Créneau : ' + booking.timeslot + '<br/>' +
    '<hr/>' +
    'Contact : ' + booking.firstname + ' ' + booking.lastname + '<br/>' +
    'Tél : ' + booking.phone + '<br/>' +
    'Mél : ' + booking.email + '<br/>' +
    '<hr/>' +
    'N\'hésitez pas à nous contacter pour toutes questions :<br/>' +
    'LES DETRITIVORES<br/>' +
    '65 quai de Brazza 33100 Bordeaux<br/>' +
    'bonjour@les-detritivores.co | 05 56 67 14 47'

  const email = await sendEmail({ to: booking.email, bcc: ['bonjour@les-detritivores.co' /*, 'Développement commercial <ec52413f.les-detritivores.co@fr.teams.ms>'*/], subject, text, html })
  return email.messageId
}
