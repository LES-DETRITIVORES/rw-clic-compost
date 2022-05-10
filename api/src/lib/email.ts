import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  // create reusable transporter object using SendInBlue for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'admin@les-detritivores.co',
      pass: process.env.SENDINBLUE_SMTP,
    },
  })

  // send mail with defined transport object
  const email = await transporter.sendMail({
    from: '"LES DETRITIVORES" <bonjour@les-detritivores.co>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  })

  console.log(email)
  return email
}