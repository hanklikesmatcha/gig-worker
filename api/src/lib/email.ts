import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'hank.likes.matcha@gmail.com',
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  const info = await transporter.sendMail({
    from: 'Szu Han" hank.likes.matcha@gmail.com',
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  })

  return info
}
