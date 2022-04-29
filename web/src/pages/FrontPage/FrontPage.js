import { Form, TextField, NumberField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import CustomerCell from 'src/components/CustomerCell'
import PaymentMethodCell from 'src/components/PaymentMethodCell'
import SEPAMethodCell from 'src/components/SEPAMethodCell'
import ClientSecretCell from 'src/components/ClientSecretCell'
import PaymentCell from 'src/components/PaymentCell'
import SMSCell from 'src/components/SMSCell'
import {useStripe, useElements, IbanElement, PaymentElement} from '@stripe/react-stripe-js';

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

  const stripe = useStripe();
  const elements = useElements();

  const IBAN_STYLE = {
    base: {
      color: '#32325d',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      ':-webkit-autofill': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
      ':-webkit-autofill': {
        color: '#fa755a',
      },
    }
  };

  const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ['SEPA'],
    placeholderCountry: 'FR',
    style: IBAN_STYLE
  };

  const [sepaMethod, setSEPAMethod] = useState()
  const formSEPA = async (data) => {
    const iban = elements.getElement(IbanElement);
    const clientSecret = 'seti_1KtHqpDczmPm9BYQD1tEXTkB_secret_LaSmLAS2HnaVTOXA8g2GW1ThehVksGA'
    const result = await stripe.confirmSepaDebitSetup(clientSecret, {
      payment_method: {
        sepa_debit: iban,
        billing_details: {
          name: data.name,
          email: data.email,
        },
      }
    });
    setSEPAMethod(data)
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
            <label htmlFor="location" className="text-md font-medium">Votre adresse :</label><br/>
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
            <label htmlFor="meals" className="text-md font-medium">Nombre de couverts servis par semaine :</label><br/>
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
            <label htmlFor="customer" className="text-md font-medium">Votre nom :</label><br/>
            <TextField name="customer" placeholder="description" className="text-sm autofill:bg-yellow-200 rounded-md border border-sky-500 p-2"/>
          <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Ajouter</Submit>
          </Form>
          <ul><li>Nouvel usager : {customer && <CustomerCell query={customer} />}</li></ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">5a. Carte bancaire</h3>
          <p className="mt-1 text-sm text-gray-600">
            Ajout d'une carte bancaire
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formPaymentMethod}>
            <label htmlFor="paymentMethod" className="text-md font-medium">Numéro de carte :</label><br/>
            <TextField name="paymentMethod" placeholder="Numéro de carte" className="text-sm rounded-md border border-sky-500 p-2"/>
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">Ajouter</Submit>
          </Form>
          <ul><li>Carte bancaire : {paymentMethod && <PaymentMethodCell query={paymentMethod} />}</li></ul>
        </div>
      </div>
      <div className="md:flex md:flex-row pt-4">
        <div className="md:col-span-1 md:basis-1/3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">5b. SEPA</h3>
          <p className="mt-1 text-sm text-gray-600">
            Ajout d'un compte bancaire
          </p>
        </div>
        <div className="md:px-4">
          <Form onSubmit={formSEPA}>
            <label className="text-md font-medium">Nom :</label><br/>
            <TextField
              name="name"
              placeholder="Do Huynh"
              required
              className="text-sm rounded-md border border-sky-500 p-2"
            /><br/>
            <label className="text-md font-medium">Mél :</label><br/>
            <TextField
              name="email"
              type="email"
              placeholder="do.huynh@les-detritivores.co"
              required
              className="text-sm rounded-md border border-sky-500 p-2"
            /><br/>
            <label>IBAN : FR1420041010050500013M02606</label><br/>
            <TextField
              name="iban"
              placeholder="FR1420041010050500013M02606"
              required
              className="text-sm rounded-md border border-sky-500 p-2"
            /><br/>
            <label>IBAN ELEMENT : FR1420041010050500013M02606</label><br/>
            <IbanElement options={IBAN_ELEMENT_OPTIONS} />
            <Submit className="text-sm ml-2 border-2 p-2 rounded-md bg-orange-500 text-white">
              Ajouter
            </Submit><br/>
            {/* Display mandate acceptance text. */}
            <p className="text-sm hidden">
              En fournissant vos informations de paiement et en confirmant ce paiement, vous autorisez (A) LES DETRITIVORES et Stripe, notre prestataire de services de paiement et/ou PPRO, son prestataire de services local, à envoyer des instructions à votre banque pour débiter votre compte et (B) votre banque à débiter votre compte conformément à ces instructions. Vous avez, entre autres, le droit de vous faire rembourser par votre banque selon les modalités et conditions du contrat conclu avec votre banque. La demande de remboursement doit être soumise dans un délai de 8 semaines à compter de la date à laquelle votre compte a été débité. Vos droits sont expliqués dans une déclaration disponible auprès de votre banque. Vous acceptez de recevoir des notifications des débits à venir dans les 2 jours précédant leur réalisation.
            </p>
          </Form>
          <ul><li>Compte bancaire : {sepaMethod && <SEPAMethodCell name={sepaMethod.name} email={sepaMethod.email} iban={sepaMethod.iban}/>}</li></ul>
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
            <label htmlFor="payment" className="text-md font-medium">Paiement :</label><br/>
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
            <label htmlFor="SMS" className="text-md font-medium">Message à envoyer :</label><br/>
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
