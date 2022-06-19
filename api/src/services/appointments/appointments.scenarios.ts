import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AppointmentCreateArgs>({
  appointment: {
    one: {
      data: {
        location: 'String',
        time: '2022-06-19T09:05:24Z',
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
        location: 'String',
        time: '2022-06-19T09:05:24Z',
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
