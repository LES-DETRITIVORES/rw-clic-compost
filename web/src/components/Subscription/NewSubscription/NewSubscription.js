import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import SubscriptionForm from 'src/components/Subscription/SubscriptionForm'

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
    }
  }
`

const NewSubscription = () => {
  const [createSubscription, { loading, error }] = useMutation(
    CREATE_SUBSCRIPTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subscription created')
        navigate(routes.subscriptions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSubscription({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Subscription</h2>
      </header>
      <div className="rw-segment-main">
        <SubscriptionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubscription
