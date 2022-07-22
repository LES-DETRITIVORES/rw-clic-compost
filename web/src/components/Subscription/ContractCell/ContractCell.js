import Subscription from 'src/components/Subscription/Subscription'

export const QUERY = gql`
  query FindSubscriptionByUser($user: Int!) {
    subscription: contract(user: $user) {
      id
      createdAt
      profile
      firstname
      lastname
      company
      email
      phone
      location
      meals
      service
      rate
      startedAt
      customer
      card
      iban
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Subscription not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ subscription }) => {
  const formatDate = (value) => {
    if (value) {
      return new Date(value).toLocaleDateString('fr-FR')
    }
  }

  return (
    <ul>
      {
        subscription.profile == "professionnel" &&
        <li><span className="font-bold">Société : </span><span className="uppercase">{subscription.company}</span></li>
      }
      <li><span className="font-bold">Date de démarrage : </span><span className="">{formatDate(subscription.startedAt)}</span></li>
      <li><span className="font-bold">Contact : </span><span className="capitalize">{subscription.firstname}</span> <span className="uppercase">{subscription.lastname}</span></li>
      <li><span className="font-bold">Tél : </span><span className="">{subscription.phone}</span></li>
      <li><span className="font-bold">Mél : </span><span className="">{subscription.email}</span></li>
      <li><span className="font-bold">Adresse de collecte : </span><span className="">{subscription.location}</span></li>
      <li><span className="font-bold">Prestation : </span><span className="">Collecte et compostage des biodéchets alimentaires</span></li>
      <li><span className="font-bold">Offre : </span><span className="">{subscription.service}</span></li>
      <li><span className="font-bold">Tarif : </span><span className="">{parseFloat(subscription.rate*(subscription.profile == "particulier" ? 1.2 : 1)).toFixed(2)} € {subscription.profile == "particulier" ? 'TTC' : 'HT'} par collecte</span></li>
      <li><span className="font-bold">Mode de réglement : </span><span className="">{subscription.card && "Carte bancaire"}{subscription.iban && "Prélévement SEPA"}</span></li>
    </ul>
  )
}
