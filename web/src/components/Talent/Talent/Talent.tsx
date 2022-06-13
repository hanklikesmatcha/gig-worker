import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { supabase } from 'src/utils/supabaseClient.js'
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
  const [gifUrl, setGifUrl] = useState<string>()
  useEffect(() => {
    const getGifUrl = async () => {
      const { data, error } = await supabase.storage
        .from('gig-worker')
        .download(`${talent.id}.gif`)
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

  return (
    <>
      <div className="flex-inline items-center justify-center h-screen w-full">
        <div>
          <figure className="relative">
            <img
              className="h-screen w-full object-cover object-center"
              src={gifUrl}
            ></img>
            <figcaption className="absolute text-lg text-white top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4">
              <div>
                <h1>
                  {talent.firstName} {talent.lastName}
                </h1>
              </div>
              <div>
                <h1>{talent.email}</h1>
              </div>
              <div>
                <h1>{talent.mobile}</h1>
              </div>
              <div>
                <h1>{talent.intro}</h1>
              </div>
              <div>
                <Link
                  type="button"
                  className="rw-button text-dark bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  to={routes.editTalent({ id: talent.id })}
                >
                  Initiate
                </Link>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

export default Talent
