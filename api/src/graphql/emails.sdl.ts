export const schema = gql`
  type Email {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    appointment: Appointment!
    appointmentId: String!
    log: String!
  }

  type Query {
    emails: [Email!]! @requireAuth
    email(id: String!): Email @requireAuth
  }

  input CreateEmailInput {
    appointmentId: String!
    log: String!
  }

  input UpdateEmailInput {
    appointmentId: String
    log: String
  }

  type Mutation {
    createEmail(input: CreateEmailInput!): Email! @requireAuth
    updateEmail(id: String!, input: UpdateEmailInput!): Email! @requireAuth
    deleteEmail(id: String!): Email! @requireAuth
  }
`
