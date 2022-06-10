import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TalentCreateArgs>({
  talent: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        mobile: 'String',
        email: 'String',
        intro: 'String',
        location: 'String',
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        mobile: 'String',
        email: 'String',
        intro: 'String',
        location: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
