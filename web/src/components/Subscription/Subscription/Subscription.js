import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_SUBSCRIPTION_MUTATION = gql`
  mutation DeleteSubscriptionMutation($id: Int!) {
    deleteSubscription(id: $id) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Subscription = ({ subscription }) => {
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION_MUTATION, {
    onCompleted: () => {
      toast.success('Subscription deleted')
      navigate(routes.subscriptions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subscription ' + id + '?')) {
      deleteSubscription({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Subscription {subscription.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{subscription.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(subscription.createdAt)}</td>
            </tr>
            <tr>
              <th>Firstname</th>
              <td>{subscription.firstname}</td>
            </tr>
            <tr>
              <th>Lastname</th>
              <td>{subscription.lastname}</td>
            </tr>
            <tr>
              <th>Company</th>
              <td>{subscription.company}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{subscription.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{subscription.phone}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{subscription.location}</td>
            </tr>
            <tr>
              <th>Meals</th>
              <td>{subscription.meals}</td>
            </tr>
            <tr>
              <th>Service</th>
              <td>{subscription.service}</td>
            </tr>
            <tr>
              <th>Started at</th>
              <td>{timeTag(subscription.startedAt)}</td>
            </tr>
            <tr>
              <th>Customer</th>
              <td>{subscription.customer}</td>
            </tr>
            <tr>
              <th>Card</th>
              <td>{subscription.card}</td>
            </tr>
            <tr>
              <th>Iban</th>
              <td>{subscription.iban}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSubscription({ id: subscription.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(subscription.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Subscription
