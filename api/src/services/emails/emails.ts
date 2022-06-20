import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  EmailResolvers,
} from 'types/graphql'

export const emails: QueryResolvers['emails'] = () => {
  return db.email.findMany()
}

export const email: QueryResolvers['email'] = ({ id }) => {
  return db.email.findUnique({
    where: { id },
  })
}

export const createEmail: MutationResolvers['createEmail'] = ({ input }) => {
  return db.email.create({
    data: input,
  })
}

export const updateEmail: MutationResolvers['updateEmail'] = ({
  id,
  input,
}) => {
  return db.email.update({
    data: input,
    where: { id },
  })
}

export const deleteEmail: MutationResolvers['deleteEmail'] = ({ id }) => {
  return db.email.delete({
    where: { id },
  })
}

export const Email: EmailResolvers = {
  talent: (_obj, { root }) =>
    db.email.findUnique({ where: { id: root.id } }).talent(),
}
