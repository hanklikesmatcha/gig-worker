import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AccountPage from 'src/pages/AccountPage/AccountPage'
import AuthPage from 'src/pages/AuthPage/AuthPage'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Welcome" />
      {!isAuthenticated ? <AuthPage /> : <AccountPage />}
    </>
  )
}

export default HomePage
