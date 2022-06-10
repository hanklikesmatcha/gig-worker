export const schema = gql`
  type Talent {
    id: Int!
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
    talent(id: Int!): Talent @requireAuth
  }

  input CreateTalentInput {
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    intro: String!
    location: String!
    deactivatedAt: DateTime
  }

  input UpdateTalentInput {
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
    updateTalent(id: Int!, input: UpdateTalentInput!): Talent! @requireAuth
    deleteTalent(id: Int!): Talent! @requireAuth
  }
`
