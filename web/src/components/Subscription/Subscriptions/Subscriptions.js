import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Subscription/SubscriptionsCell'

const DELETE_SUBSCRIPTION_MUTATION = gql`
  mutation DeleteSubscriptionMutation($id: Int!) {
    deleteSubscription(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const SubscriptionsList = ({ subscriptions }) => {
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION_MUTATION, {
    onCompleted: () => {
      toast.success('Subscription deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subscription ' + id + '?')) {
      deleteSubscription({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Meals</th>
            <th>Service</th>
            <th>Started at</th>
            <th>Customer</th>
            <th>Card</th>
            <th>Iban</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td>{truncate(subscription.id)}</td>
              <td>{timeTag(subscription.createdAt)}</td>
              <td>{truncate(subscription.firstname)}</td>
              <td>{truncate(subscription.lastname)}</td>
              <td>{truncate(subscription.company)}</td>
              <td>{truncate(subscription.email)}</td>
              <td>{truncate(subscription.phone)}</td>
              <td>{truncate(subscription.location)}</td>
              <td>{truncate(subscription.meals)}</td>
              <td>{truncate(subscription.service)}</td>
              <td>{timeTag(subscription.startedAt)}</td>
              <td>{truncate(subscription.customer)}</td>
              <td>{truncate(subscription.card)}</td>
              <td>{truncate(subscription.iban)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.subscription({ id: subscription.id })}
                    title={'Show subscription ' + subscription.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubscription({ id: subscription.id })}
                    title={'Edit subscription ' + subscription.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete subscription ' + subscription.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(subscription.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionsList
