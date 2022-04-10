import OrdersLayout from 'src/layouts/OrdersLayout'
import EditOrderCell from 'src/components/EditOrderCell'

const EditOrderPage = ({ id }) => {
  return (
    <OrdersLayout>
      <EditOrderCell id={id} />
    </OrdersLayout>
  )
}

export default EditOrderPage
