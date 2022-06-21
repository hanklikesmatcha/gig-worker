import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import type {
  QueryResolvers,
  MutationResolvers,
  AppointmentResolvers,
} from 'types/graphql'

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
    const talent = await db.talent.findUnique({ where: { id: input.talentId } })
    const msg = {
      to: talent.email,
      subject: `Hi! You have booked a time with ${talent.firstName}`,
      text: 'and easy to do anywhere, even with Node.js',
      html: `<strong>With ${talent.firstName} ${talent.lastName}. Booking time - ${input.time}. Location - ${input.location}</strong>`,
    }
    await sendEmail(msg)
    return db.appointment.create({
      data: input,
    })
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
}
