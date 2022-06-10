import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AppointmentCreateArgs>({
  appointment: {
    one: {
      data: {
        location: 'String',
        time: '2022-06-22T07:09:03Z',
        attendees: ['String'],
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
        time: '2022-06-22T07:09:03Z',
        attendees: ['String'],
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
