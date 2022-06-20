export const schema = gql`
  type Talent {
    id: Int!
    appointment: [Appointment]!
    profilePhoto: String
    status: String!
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    intro: String!
    location: String!
    createdAt: DateTime!
    updatedAt: DateTime
    deactivatedAt: DateTime
    emails: [Email]!
  }

  type Query {
    talents: [Talent!]! @requireAuth
    talent(id: Int!): Talent @requireAuth
  }

  input CreateTalentInput {
    profilePhoto: String
    status: String!
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
    emailTalent(id: Int!): Talent! @skipAuth
  }

  type Mutation {
    createTalent(input: CreateTalentInput!): Talent! @requireAuth
    updateTalent(id: Int!, input: UpdateTalentInput!): Talent! @requireAuth
    deleteTalent(id: Int!): Talent! @requireAuth
  }
`
