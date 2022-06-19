import { db } from 'src/lib/db'
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

export const createAppointment: MutationResolvers['createAppointment'] = ({
  input,
}) => {
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
