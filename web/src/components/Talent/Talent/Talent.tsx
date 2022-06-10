import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import {supabase} from 'src/utils/supabaseClient.js'
import { useEffect, useState } from 'react'

const DELETE_TALENT_MUTATION = gql`
  mutation DeleteTalentMutation($id: Int!) {
    deleteTalent(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Talent = ({ talent }) => {
  const [data, setData] = useState<Blob>()
  const [gifUrl, setGifUrl] = useState<string>()
  useEffect(() => {
    const getGifUrl = async() => {
      const {data, error}  = await supabase.storage.from('gig-worker').download('1.gif')
      const reader = new FileReader()
      reader.readAsDataURL(data)
      reader.onloadend = () => {
        const base64data = reader.result.toString()
        setGifUrl(base64data)
      }
    }
    getGifUrl()
  }, [])

  const [deleteTalent] = useMutation(DELETE_TALENT_MUTATION, {
    onCompleted: () => {
      toast.success('Talent deleted')
      navigate(routes.talents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete talent ' + id + '?')) {
      deleteTalent({ variables: { id } })
    }
  }
  // const dataUrl = URL.createObjectURL(data)
  console.log(gifUrl)

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Talent {talent.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{talent.id}</td>
            </tr><tr>
              <th>Avatar</th>
              <td><img width='200' src={gifUrl}></img></td>
            </tr><tr>
            </tr><tr>
              <th>First name</th>
              <td>{talent.firstName}</td>
            </tr><tr>
              <th>Last name</th>
              <td>{talent.lastName}</td>
            </tr><tr>
              <th>Mobile</th>
              <td>{talent.mobile}</td>
            </tr><tr>
              <th>Email</th>
              <td>{talent.email}</td>
            </tr><tr>
              <th>Intro</th>
              <td>{talent.intro}</td>
            </tr><tr>
              <th>Location</th>
              <td>{talent.location}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(talent.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(talent.updatedAt)}</td>
            </tr><tr>
              <th>Deactivated at</th>
              <td>{timeTag(talent.deactivatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTalent({ id: talent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(talent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Talent
