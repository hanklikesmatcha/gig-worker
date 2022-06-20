import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import type {
  QueryResolvers,
  MutationResolvers,
  TalentResolvers,
} from 'types/graphql'
import { createEmail } from '../emails/emails'
import type { Prisma } from '@prisma/client'

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
const msg = {
  to: 'hank.likes.matcha@gmail.com',
  from: 'hank.likes.matcha@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

export const emailTalent = async ({ id }: Prisma.TalentWhereUniqueInput) => {
  const talent = await db.talent.findUnique({
    where: { id },
  })
  await sendEmail(msg)
  await createEmail({
    input: {
      talentId: talent.id,
      log: 'Admin sent test email to user',
    },
  })
  return talent
}

export const Talent: TalentResolvers = {
  appointment: (_obj, { root }) =>
    db.talent.findUnique({ where: { id: root.id } }).appointment(),
  emails: (_obj, { root }) =>
    db.talent.findUnique({ where: { id: root.id } }).emails(),
}
