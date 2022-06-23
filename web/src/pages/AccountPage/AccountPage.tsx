import { useAuth } from '@redwoodjs/auth'

const AccountPage = () => {
  const { client: supabase, logOut } = useAuth()
  const user = supabase.auth.user()

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Account Details</h1>
        <p className="description">Your profile</p>
        <div className="form-widget">
          <div>
            <label htmlFor="email">Email</label>
            <p>{user.email}</p>
          </div>
          <div>
            <button className="button block" onClick={() => logOut()}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
