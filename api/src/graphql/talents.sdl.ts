export const schema = gql`
  type Talent {
    id: String!
    appointment: [Appointment]!
    profilePhoto: String
    status: String
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    intro: String!
    location: String!
    createdAt: DateTime!
    updatedAt: DateTime
    deactivatedAt: DateTime
  }

  type Query {
    talents: [Talent!]! @requireAuth
    talent(id: String!): Talent @requireAuth
  }

  input CreateTalentInput {
    profilePhoto: String
    status: String
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    intro: String!
    location: String!
    deactivatedAt: DateTime
  }

  input UpdateTalentInput {
    profilePhoto: String
    status: String
    firstName: String
    lastName: String
    mobile: String
    email: String
    intro: String
    location: String
    deactivatedAt: DateTime
  }

  type Mutation {
    createTalent(input: CreateTalentInput!): Talent! @requireAuth
    updateTalent(id: String!, input: UpdateTalentInput!): Talent! @requireAuth
    deleteTalent(id: String!): Talent! @requireAuth
  }
`
