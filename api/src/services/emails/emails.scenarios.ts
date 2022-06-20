import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.EmailCreateArgs>({
  email: {
    one: {
      data: {
        log: 'String',
        talent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            mobile: 'String',
            email: 'String',
            intro: 'String',
            location: 'String',
          },
        },
      },
    },
    two: {
      data: {
        log: 'String',
        talent: {
          create: {
            firstName: 'String',
            lastName: 'String',
            mobile: 'String',
            email: 'String',
            intro: 'String',
            location: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
