import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Booking from 'src/components/Booking/Booking'
import { useAuth } from '@redwoodjs/auth'

const Talent = ({ talent }) => {
  const [gifUrl, setGifUrl] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { client: supabase, isAuthenticated } = useAuth()

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

  const handleBooking = async (talentId: string) => {
    if (isAuthenticated) {
      setModalShow(true)
    } else {
      try {
        setLoading(true)
        const { user, session, error } = await supabase.auth.signIn(
          {
            provider: 'google',
          },
          {
            redirectTo: window.location.href,
          }
        )
        if (error) throw error
      } catch (error) {
        alert(error.error_description || error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <div className="bg-transparent flex-block items-center justify-center">
        <div>
          <div>
            <Booking
              className="absolute inset-10 bg-red-200 bg-opacity-50 rounded-xl"
              show={modalShow}
              fullscreen={true}
              onHide={() => setModalShow(false)}
              talent={talent}
            />
          </div>
          <figure className="relative">
            <img
              className="h-screen w-full object-cover object-center"
              src={gifUrl}
            ></img>
            <figcaption className="absolute text-lg text-center text-white top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 align-middle">
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
              <div className="flex justify-center">
                <Button
                  onClick={() => handleBooking(talent.id)}
                  className="rw-button text-dark bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-4"
                >
                  {loading ? <span>Loading</span> : <span>Book Me ▶️</span>}
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
