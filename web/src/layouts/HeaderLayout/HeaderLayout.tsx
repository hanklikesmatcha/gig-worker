import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
type HeaderLayoutProps = {
  children?: React.ReactNode
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  const { client: supabase, logOut, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const { search } = useLocation()
  const hasRedirectTo = /redirectTo/.test(search)
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
          redirectTo: hasRedirectTo
            ? window.location.origin + `${redirectTo}`
            : routes.home(),
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
    <>
      <header>
        <nav className="bg-transparent">
          <Toaster />
          <div className="grid grid-rows-1 grid-flow-col place-content-end">
            <ul className="grid grid-cols-2 gap-2 p-4">
              <li>
                {!supabase.auth.currentUser && (
                  <button
                    className="button block hover:bg-green-400"
                    onClick={() => handleLogin()}
                  >
                    Log In
                  </button>
                )}
              </li>
              <li>
                <button
                  className="button block hover:bg-orange-500"
                  onClick={() => {
                    logOut()
                    toast('Log out successfully!')
                  }}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  )
}

export default HeaderLayout
