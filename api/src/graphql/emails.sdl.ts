export const schema = gql`
  type Email {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    talent: Talent!
    talentId: Int!
    log: String!
  }

  type Query {
    emails: [Email!]! @skipAuth
    email(id: String!): Email @skipAuth
  }

  input CreateEmailInput {
    talentId: Int!
    log: String!
  }

  input UpdateEmailInput {
    talentId: Int
    log: String
  }

  type Mutation {
    createEmail(input: CreateEmailInput!): Email! @skipAuth
    updateEmail(id: String!, input: UpdateEmailInput!): Email! @skipAuth
    deleteEmail(id: String!): Email! @skipAuth
  }
`
