import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { routes, useLocation } from '@redwoodjs/router'
const AuthPage = () => {
  const [loading, setLoading] = useState(false)
  const { client: supabase, logOut } = useAuth()
  const { search } = useLocation()
  const redirectTo = search
    .replace('?redirectTo=', '')
    .replace(/&\S+=\S[&^]/g, '')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn(
        {
          provider: 'google',
        },
        {
          redirectTo: routes.home(),
        }
      )
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header text-center text-5xl">Welcome!</h1>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin()
            }}
            className="button block"
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Log in with Google</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
