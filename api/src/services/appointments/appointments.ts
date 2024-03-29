import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import type {
  QueryResolvers,
  MutationResolvers,
  AppointmentResolvers,
} from 'types/graphql'
import { createEmail } from '../emails/emails'
import dayjs from 'dayjs'

export const appointments: QueryResolvers['appointments'] = () => {
  return db.appointment.findMany()
}

export const appointment: QueryResolvers['appointment'] = ({ id }) => {
  return db.appointment.findUnique({
    where: { id },
  })
}

export const createAppointment: MutationResolvers['createAppointment'] =
  async ({ input }) => {
    const talent = await db.talent.findUnique({
      where: { id: input.talentId },
    })
    const msg = {
      senderEmail: talent.email,
      senderName: talent.firstName,
      to: input.attendees,
      subject: `Hi! You have booked a time with ${talent.firstName}`,
      text: `${talent.firstName} ${talent.lastName}. Booking time - ${input.time}. Location - ${input.location}`,
      html: `<strong>With ${talent.firstName} ${talent.lastName}. Booking time - ${input.time}. Location - ${input.location}</strong>`,
      time: dayjs(input.time),
      location: talent.location,
      attendees: input.attendees,
    }
    await sendEmail(msg)
    const appointment = db.appointment.create({
      data: input,
    })
    await createEmail({
      input: {
        appointmentId: (await appointment).id,
        log: 'Admin sent test email to user',
      },
    })
    return appointment
  }

export const updateAppointment: MutationResolvers['updateAppointment'] = ({
  id,
  input,
}) => {
  return db.appointment.update({
    data: input,
    where: { id },
  })
}

export const deleteAppointment: MutationResolvers['deleteAppointment'] = ({
  id,
}) => {
  return db.appointment.delete({
    where: { id },
  })
}

export const Appointment: AppointmentResolvers = {
  talent: (_obj, { root }) =>
    db.appointment.findUnique({ where: { id: root.id } }).talent(),
  emails: (_obj, { root }) =>
    db.appointment.findUnique({ where: { id: root.id } }).emails(),
}
