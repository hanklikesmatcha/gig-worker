export const schema = gql`
  type Appointment {
    id: String!
    talent: Talent!
    talentId: String!
    location: String!
    status: String!
    time: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime
    emails: [Email]!
    attendees: [String]!
    calendarId: String
    calendarLink: String
  }

  type Query {
    appointments: [Appointment!]! @requireAuth
    appointment(id: String!): Appointment @requireAuth
  }

  input CreateAppointmentInput {
    talentId: String!
    location: String!
    status: String!
    time: DateTime!
    attendees: [String]!
    calendarId: String
    calendarLink: String
  }

  input UpdateAppointmentInput {
    talentId: String
    location: String
    status: String
    time: DateTime
    attendees: [String]!
    calendarId: String
    calendarLink: String
  }

  type Mutation {
    createAppointment(input: CreateAppointmentInput!): Appointment! @requireAuth
    updateAppointment(
      id: String!
      input: UpdateAppointmentInput!
    ): Appointment! @requireAuth
    deleteAppointment(id: String!): Appointment! @requireAuth
  }
`
