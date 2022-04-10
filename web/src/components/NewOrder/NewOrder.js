import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import OrderForm from 'src/components/OrderForm'

import { QUERY } from 'src/components/OrdersCell'

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
    }
  }
`

const NewOrder = () => {
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order created')
      navigate(routes.orders())
    },
  })

  const onSave = (input) => {
    createOrder({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Order</h2>
      </header>
      <div className="rw-segment-main">
        <OrderForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewOrder
