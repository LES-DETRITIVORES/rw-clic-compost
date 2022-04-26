import { Form, TextField, NumberField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import GeocoderCell from 'src/components/GeocoderCell'
import CustomerCell from 'src/components/CustomerCell'
import PaymentMethodCell from 'src/components/PaymentMethodCell'
import PaymentCell from 'src/components/PaymentCell'
import SMSCell from 'src/components/SMSCell'


const LocationPage = () => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 52/12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1/3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL/WEIGHT_BY_LITER+0.08 // 0.42 + 0.08 = 0.5
  
  const [location, setLocation] = useState()
  const formLocation = (data) => {
    setLocation(data.location)
  }

  const [meals, setMeals] = useState()
  const formPrice = (data) => {
    setMeals(data.meals)
  }

  const [service, setService] = useState()
  const formService = (data) => {
    setService(data.service)
  }

  const [customer, setCustomer] = useState()
  const formCustomer = (data) => {
    setCustomer(data.customer)
  }

  const [paymentMethod, setPaymentMethod] = useState()
  const formPaymentMethod = (data) => {
    setPaymentMethod(data.paymentMethod)
  }

  const [payment, setPayment] = useState()
  const formPayment = (data) => {
    setPayment(data.payment)
  }

  const [sms, setSMS] = useState()
  const formSMS = (data) => {
    setSMS(data.sms)
  }

  return (
    <div className="md:container mx-auto p-4 space-y-8">
      <div>
        <h1 className="font-medium">FRONT FUNCTIONS</h1>
        <p>Localisation &gt; Estimation &gt; Prestation &gt; Client &gt; Moyen de paiement &gt; Paiement &gt; SMS</p>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">1. Localisation</h3>
            <p className="mt-1 text-sm text-gray-600">
              Calcule la distance à la plateforme de compostage la plus proche.
            </p>
          </div>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formLocation}>
            <label htmlfor="location" className="text-md font-medium">Votre adresse :</label><br/>
            <TextField name="location" placeholder="Adresse" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Calculer</Submit>      
          </Form>
          {location && <GeocoderCell query={location} />}
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">2. Budget</h3>
            <p className="mt-1 text-sm text-gray-600">
              Calcule le tarif de prise en charge
            </p>
          </div>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formPrice}>
            <label htmlfor="meals" className="text-md font-medium">Nombre de couverts servis par semaine :</label><br/>
            <NumberField name="meals" placeholder="Repas par semaine" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Estimer</Submit>
          </Form>
          <ul className="list-disc">
            <li>Nombre de repas : {(meals*WEEKS_BY_MONTH).toFixed(0)} repas par mois</li>
            <li>Poids estimé : {(meals*WEIGHT_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} kg par mois</li>
            <li>Volume estimé : {(meals*LITER_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} L par mois</li>
            <li>Tarif estimé : {(meals*LITER_BY_MEAL*PRICE_BY_LITER*WEEKS_BY_MONTH).toFixed(2)} € HT par mois</li>
            <li>Coût par repas : {(LITER_BY_MEAL*PRICE_BY_LITER).toFixed(2)} € HT</li>
          </ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">3. Offres</h3>
          <p className="mt-1 text-sm text-gray-600">
            Choix de la prestation
          </p>
        </div>
        <div className="md:px-4">
          <RadioGroup value={service} onChange={setService} className="space-y-2">
            <RadioGroup.Label className="text-md font-medium">Offres :</RadioGroup.Label>
            <RadioGroup.Option value="Bioseau" className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }>
              {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            Bioseau 22L
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                            {(meals*LITER_BY_MEAL/22).toFixed(0)}x bioseau 22L par semaine
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{((meals*LITER_BY_MEAL/22).toFixed(0)*22*PRICE_BY_LITER).toFixed(2)}€</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Bac roulant 120L" className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }>
              {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            Bac roulant 120L
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                            {(meals*LITER_BY_MEAL/120).toFixed(0)}x bac roulant 120L par semaine
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{((meals*LITER_BY_MEAL/120).toFixed(0)*120*PRICE_BY_LITER).toFixed(2)}€</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Caisse palette 500L" className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }>
              {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            Caisse palette 500L
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                            {(meals*LITER_BY_MEAL/120).toFixed(0)}x caisse palette 500L par semaine
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{((meals*LITER_BY_MEAL/500).toFixed(0)*500*PRICE_BY_LITER).toFixed(2)}€</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-white">
                          <CheckIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">4. Compte</h3>
          <p className="mt-1 text-sm text-gray-600">
            Création du compte usager
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formCustomer}>
            <label htmlfor="customer" className="text-md font-medium">Votre nom :</label><br/>
            <TextField name="customer" placeholder="description" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
          <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Ajouter</Submit>
          </Form>
          <ul><li>Nouvel usager : {customer && <CustomerCell query={customer} />}</li></ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">5. Méthode de paiement</h3>
          <p className="mt-1 text-sm text-gray-600">
            Ajout d'une méthode de paiement
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formPaymentMethod}>
            <label htmlfor="paymentMethod" className="text-md font-medium">Numéro de carte :</label><br/>
            <TextField name="paymentMethod" placeholder="Numéro de carte" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Ajouter</Submit>
          </Form>
          <ul><li>Méthode de paiement : {paymentMethod && <PaymentMethodCell query={paymentMethod} />}</li></ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">6. Paiement</h3>
          <p className="mt-1 text-sm text-gray-600">
            Paiement du service
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formPayment}>
            <label htmlfor="payment" className="text-md font-medium">Paiement :</label><br/>
            <NumberField name="payment" placeholder="Tarif" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Payer</Submit>
          </Form>
          <ul><li>Paiement : {payment && <PaymentCell query={payment} />}</li></ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">7. Confirmation</h3>
          <p className="mt-1 text-sm text-gray-600">
            Confirmation par SMS
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formSMS}>
            <label htmlfor="SMS" className="text-md font-medium">Message à envoyer :</label><br/>
            <TextField name="sms" placeholder="Message" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Envoyer</Submit>
          </Form>
          <ul><li>SMS : {sms && <SMSCell query={sms} />}</li></ul>
        </div>
      </div>
    </div>
  )
}

export default LocationPage
