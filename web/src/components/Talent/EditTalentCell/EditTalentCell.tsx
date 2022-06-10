import type { EditTalentById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TalentForm from 'src/components/Talent/TalentForm'

export const QUERY = gql`
  query EditTalentById($id: Int!) {
    talent: talent(id: $id) {
      id
      firstName
      lastName
      mobile
      email
      intro
      location
      createdAt
      updatedAt
      deactivatedAt
    }
  }
`
const UPDATE_TALENT_MUTATION = gql`
  mutation UpdateTalentMutation($id: Int!, $input: UpdateTalentInput!) {
    updateTalent(id: $id, input: $input) {
      id
      firstName
      lastName
      mobile
      email
      intro
      location
      createdAt
      updatedAt
      deactivatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ talent }: CellSuccessProps<EditTalentById>) => {
  const [updateTalent, { loading, error }] = useMutation(UPDATE_TALENT_MUTATION, {
    onCompleted: () => {
      toast.success('Talent updated')
      navigate(routes.talents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateTalent({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Talent {talent.id}</h2>
      </header>
      <div className="rw-segment-main">
        <TalentForm talent={talent} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
