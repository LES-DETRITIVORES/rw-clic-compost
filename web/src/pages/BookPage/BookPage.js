import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const BookPage = () => {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()
  return (
    <>
      <MetaTags title="Book" description="Book page" />
      <div className="rw-button rw-button-green" onClick={logOut}>
        Se déconnecter
      </div>
      <h1>BookPage</h1>
      <p>
        Find me in <code>./web/src/pages/BookPage/BookPage.js</code>
      </p>
      <p>
        My default route is named <code>book</code>, link to me with `
        <Link to={routes.book()}>Book</Link>`
      </p>
    </>
  )
}

export default BookPage
