import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
import { useAuth } from '@redwoodjs/auth'

const UsersLayout = ({ children }) => {
  const { logOut } = useAuth()

  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.users()} className="rw-link">
            Users
          </Link>
        </h1>
        <Link to={routes.newUser()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New User
        </Link>
        <div className="rw-button rw-button-blue" onClick={logOut}>
          Log out
        </div>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default UsersLayout
