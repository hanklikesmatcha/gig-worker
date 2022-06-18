import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import { supabase } from 'src/utils/supabaseClient.js'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Booking from 'src/components/Booking/Booking'

const DELETE_TALENT_MUTATION = gql`
  mutation DeleteTalentMutation($id: Int!) {
    deleteTalent(id: $id) {
      id
    }
  }
`

const Talent = ({ talent }) => {
  const [gifUrl, setGifUrl] = useState<string>()
  useEffect(() => {
    const getGifUrl = async () => {
      const { data, error } = await supabase.storage
        .from('gig-worker')
        .download(talent.profilePhoto)
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

  const [modalShow, setModalShow] = React.useState(false)

  return (
    <>
      <div className="flex-block items-center justify-center">
        <div>
          <div>
            <Booking
              className="absolute inset-10 bg-blue-300 bg-opacity-50"
              show={modalShow}
              fullscreen={true}
              onHide={() => setModalShow(false)}
            />
          </div>
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
                <Button
                  onClick={() => setModalShow(true)}
                  className="rw-button text-dark bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Book Me
                </Button>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

export default Talent
