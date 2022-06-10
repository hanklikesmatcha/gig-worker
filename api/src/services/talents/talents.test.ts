import {
  talents,
  talent,
  createTalent,
  updateTalent,
  deleteTalent,
} from './talents'
import type { StandardScenario } from './talents.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('talents', () => {
  scenario('returns all talents', async (scenario: StandardScenario) => {
    const result = await talents()

    expect(result.length).toEqual(Object.keys(scenario.talent).length)
  })

  scenario('returns a single talent', async (scenario: StandardScenario) => {
    const result = await talent({ id: scenario.talent.one.id })

    expect(result).toEqual(scenario.talent.one)
  })

  scenario('creates a talent', async () => {
    const result = await createTalent({
      input: {
        firstName: 'String',
        lastName: 'String',
        mobile: 'String',
        email: 'String',
        intro: 'String',
        location: 'String',
      },
    })

    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.mobile).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.intro).toEqual('String')
    expect(result.location).toEqual('String')
  })

  scenario('updates a talent', async (scenario: StandardScenario) => {
    const original = await talent({ id: scenario.talent.one.id })
    const result = await updateTalent({
      id: original.id,
      input: { firstName: 'String2' },
    })

    expect(result.firstName).toEqual('String2')
  })

  scenario('deletes a talent', async (scenario: StandardScenario) => {
    const original = await deleteTalent({ id: scenario.talent.one.id })
    const result = await talent({ id: original.id })

    expect(result).toEqual(null)
  })
})
