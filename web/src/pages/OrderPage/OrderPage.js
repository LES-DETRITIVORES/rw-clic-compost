import OrdersLayout from 'src/layouts/OrdersLayout'
import OrderCell from 'src/components/OrderCell'

const OrderPage = ({ id }) => {
  return (
    <OrdersLayout>
      <OrderCell id={id} />
    </OrdersLayout>
  )
}

export default OrderPage
