import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TalentForm from 'src/components/Talent/TalentForm'

const CREATE_TALENT_MUTATION = gql`
  mutation CreateTalentMutation($input: CreateTalentInput!) {
    createTalent(input: $input) {
      id
    }
  }
`

const NewTalent = () => {
  const [createTalent, { loading, error }] = useMutation(
    CREATE_TALENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Talent created')
        navigate(routes.talents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTalent({
      variables: {
        input,
      },
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Talent</h2>
      </header>
      <div className="rw-segment-main">
        <TalentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTalent
