import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SubscribePage = () => {
  return (
    <>
      <MetaTags title="Subscribe" description="Subscribe page" />

      <h1>SubscribePage</h1>
      <p>
        Find me in <code>./web/src/pages/SubscribePage/SubscribePage.js</code>
      </p>
      <p>
        My default route is named <code>subscribe</code>, link to me with `
        <Link to={routes.subscribe()}>Subscribe</Link>`
      </p>
    </>
  )
}

export default SubscribePage
