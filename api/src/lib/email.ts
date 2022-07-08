import * as nodemailer from 'nodemailer'
import { createInvitation, InvitationProps } from './calendar'
import dayjs from 'dayjs'

interface SendEmailOptions {
  senderEmail: string
  senderName: string
  to: string | string[]
  subject: string
  text: string
  html: string
  time: dayjs.Dayjs
  location: string
}

export async function sendEmail({
  senderEmail,
  senderName,
  to,
  subject,
  text,
  html,
  time,
  location,
}: SendEmailOptions) {
  let inviteProps: InvitationProps = {
    startTime: time.toDate(),
    endTime: time.hour(1).toDate(),
    description: text,
    location: location,
  }
  const invite = createInvitation(inviteProps).toString()
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
    from: `"${senderName}" ${senderEmail}`,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
    icalEvent: {
      filename: 'invitation.ics',
      method: 'REQUEST',
      content: Buffer.from(invite),
    },
  })
  return info
}
