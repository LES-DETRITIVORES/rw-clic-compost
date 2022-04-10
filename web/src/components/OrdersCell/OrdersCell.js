import { Link, routes } from '@redwoodjs/router'

import Orders from 'src/components/Orders'

export const QUERY = gql`
  query ORDERS {
    orders {
      id
      createdAt
      name
      email
      phone
      location
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No orders yet. '}
      <Link to={routes.newOrder()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ orders }) => {
  return <Orders orders={orders} />
}
