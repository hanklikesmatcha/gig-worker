import {
  appointments,
  appointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from './appointments'
import type { StandardScenario } from './appointments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('appointments', () => {
  scenario('returns all appointments', async (scenario: StandardScenario) => {
    const result = await appointments()

    expect(result.length).toEqual(Object.keys(scenario.appointment).length)
  })

  scenario(
    'returns a single appointment',
    async (scenario: StandardScenario) => {
      const result = await appointment({ id: scenario.appointment.one.id })

      expect(result).toEqual(scenario.appointment.one)
    }
  )

  scenario('creates a appointment', async (scenario: StandardScenario) => {
    const result = await createAppointment({
      input: {
        talentId: scenario.appointment.two.talentId,
        location: 'String',
        status: 'active',
        time: '2022-06-22T07:09:03Z',
        attendees: ['String'],
      },
    })

    expect(result.talentId).toEqual(scenario.appointment.two.talentId)
    expect(result.location).toEqual('String')
    expect(result.time).toEqual('2022-06-22T07:09:03Z')
    expect(result.attendees).toEqual('String')
  })

  scenario('updates a appointment', async (scenario: StandardScenario) => {
    const original = await appointment({ id: scenario.appointment.one.id })
    const result = await updateAppointment({
      id: original.id,
      input: { location: 'String2', attendees: ['test attendee'] },
    })

    expect(result.location).toEqual('String2')
  })

  scenario('deletes a appointment', async (scenario: StandardScenario) => {
    const original = await deleteAppointment({
      id: scenario.appointment.one.id,
    })
    const result = await appointment({ id: original.id })

    expect(result).toEqual(null)
  })
})
