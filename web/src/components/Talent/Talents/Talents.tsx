import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Talent/TalentsCell'

const DELETE_TALENT_MUTATION = gql`
  mutation DeleteTalentMutation($id: String!) {
    deleteTalent(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TalentsList = ({ talents }) => {
  const [deleteTalent] = useMutation(DELETE_TALENT_MUTATION, {
    onCompleted: () => {
      toast.success('Talent deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete talent ' + id + '?')) {
      deleteTalent({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Profile photo link</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Intro</th>
            <th>Location</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((talent) => (
            <tr key={talent.id}>
              <td>{truncate(talent.id)}</td>
              <td>{talent.profilePhoto}</td>
              <td>{truncate(talent.firstName)}</td>
              <td>{truncate(talent.lastName)}</td>
              <td>{truncate(talent.mobile)}</td>
              <td>{truncate(talent.email)}</td>
              <td>{truncate(talent.intro)}</td>
              <td>{truncate(talent.location)}</td>
              <td>{timeTag(talent.createdAt)}</td>
              <td>{timeTag(talent.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.talent({ id: talent.id })}
                    title={'Show talent ' + talent.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTalent({ id: talent.id })}
                    title={'Edit talent ' + talent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete talent ' + talent.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(talent.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TalentsList
