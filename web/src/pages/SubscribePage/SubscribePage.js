import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useState } from 'react'
import { Form, Label, TextField, FormError, DateField, Submit } from '@redwoodjs/forms'

const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscriptionMutation($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
    }
  }
`

const SubscribePage = ({f, n, c, e, p, l, m, s}) => {
  const [create, {loading, error}] = useMutation(CREATE_SUBSCRIPTION, {
    onCompleted: () => {
      toast.success('Merci pour votre abonnement !')
    },
  })

  const [subscription, setSubscription] = useState({
    firstname : f,
    lastname : n,
    company: c,
    email: e,
    phone : p,
    location : l,
    meals : parseInt(m),
    service : s,
    startedAt : '',
    card: '',
    iban: ''
  })

  const subscriptionSubmit = (data) => {
    var sub = subscription
    sub.startedAt = data.startedAt
    sub.card = data.card
    sub.iban = data.iban
    console.log(JSON.stringify(sub))
    create({ variables: { input: sub } })
  }
  
  return (
    <>
      <MetaTags title="Subscribe" description="Subscribe page" />
      { subscription &&
      <div>
        <div>
          <Link to={routes.offer({l:l, m:m, f:f, n:n, c:c, e:e, p:p, s:s})}>&lt; Changer d'offre</Link>
        </div>
        <div className="font-medium text-center text-2xl md:text-3xl mt-16">
          Validez votre contrat de collecte
        </div>
        <div className="container mx-auto max-w-6xl font-sans">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                <h1 className="uppercase font-bold text-lg text-center mb-6">Contrat de tri des biodéchets</h1>
                <ul>
                  <li><span className="font-bold">Société : </span><span className="uppercase">{subscription.company}</span></li>
                  <li><span className="font-bold">Contact : </span><span className="capitalize">{subscription.firstname}</span> <span className="uppercase">{subscription.lastname}</span></li>
                  <li><span className="font-bold">Tél : </span><span className="">{subscription.phone}</span></li>
                  <li><span className="font-bold">Mél : </span><span className="">{subscription.email}</span></li>
                  <li><span className="font-bold">Adresse de collecte : </span><span className="">{subscription.location}</span></li>
                  <li><span className="font-bold">Prestation : </span><span className="lowercase">Collecte et compostage de {subscription.service}</span></li>
                </ul>
              </div>
            </div>
            <div>
              <Toaster />
              <Form onSubmit={subscriptionSubmit} config={{ mode: 'onBlur' }} error={error} className="container mx-auto font-sans">
                <FormError error={error} wrapperClassName="form-error" />
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block">
                    Date de démarrage
                  </Label>
                  <DateField name="startedAt" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Numéro carte bleu
                  </Label>
                  <TextField name="card" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    IBAN
                  </Label>
                  <TextField name="iban" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                </div>
                <div>
                    <Submit
                      disabled={loading}
                      className="sm:text-sm md:text-lg uppercase font-bold bg-blue-600 rounded-b-md p-4 text-white w-full shadow-lg">S'abonner</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default SubscribePage
