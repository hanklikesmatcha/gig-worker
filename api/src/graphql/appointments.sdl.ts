export const schema = gql`
  type Appointment {
    id: Int!
    talent: Talent!
    talentId: Int!
    location: String!
    status: String!
    time: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime
  }

  type Query {
    appointments: [Appointment!]! @requireAuth
    appointment(id: Int!): Appointment @requireAuth
  }

  input CreateAppointmentInput {
    talentId: Int!
    location: String!
    status: String!
    time: DateTime!
  }

  input UpdateAppointmentInput {
    talentId: Int
    location: String
    status: String
    time: DateTime
  }

  type Mutation {
    createAppointment(input: CreateAppointmentInput!): Appointment! @requireAuth
    updateAppointment(id: Int!, input: UpdateAppointmentInput!): Appointment!
      @requireAuth
    deleteAppointment(id: Int!): Appointment! @requireAuth
  }
`
