import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import SubscriptionForm from 'src/components/Subscription/SubscriptionForm'

export const QUERY = gql`
  query EditSubscriptionById($id: Int!) {
    subscription: subscription(id: $id) {
      id
      createdAt
      firstname
      lastname
      company
      email
      phone
      location
      meals
      service
      startedAt
      customer
      card
      iban
    }
  }
`
const UPDATE_SUBSCRIPTION_MUTATION = gql`
  mutation UpdateSubscriptionMutation(
    $id: Int!
    $input: UpdateSubscriptionInput!
  ) {
    updateSubscription(id: $id, input: $input) {
      id
      createdAt
      firstname
      lastname
      company
      email
      phone
      location
      meals
      service
      startedAt
      customer
      card
      iban
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ subscription }) => {
  const [updateSubscription, { loading, error }] = useMutation(
    UPDATE_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subscription updated')
        navigate(routes.subscriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateSubscription({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Subscription {subscription.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubscriptionForm
          subscription={subscription}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
