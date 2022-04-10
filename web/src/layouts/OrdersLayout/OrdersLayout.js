import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const OrdersLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.orders()} className="rw-link">
            Orders
          </Link>
        </h1>
        <Link to={routes.newOrder()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Order
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default OrdersLayout
