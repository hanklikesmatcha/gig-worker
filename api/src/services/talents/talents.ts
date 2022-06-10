import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TalentResolvers,
} from 'types/graphql'

export const talents: QueryResolvers['talents'] = () => {
  return db.talent.findMany()
}

export const talent: QueryResolvers['talent'] = ({ id }) => {
  return db.talent.findUnique({
    where: { id },
  })
}

export const createTalent: MutationResolvers['createTalent'] = ({ input }) => {
  return db.talent.create({
    data: input,
  })
}

export const updateTalent: MutationResolvers['updateTalent'] = ({
  id,
  input,
}) => {
  return db.talent.update({
    data: input,
    where: { id },
  })
}

export const deleteTalent: MutationResolvers['deleteTalent'] = ({ id }) => {
  return db.talent.delete({
    where: { id },
  })
}

export const Talent: TalentResolvers = {
  appointment: (_obj, { root }) =>
    db.talent.findUnique({ where: { id: root.id } }).appointment(),
}
