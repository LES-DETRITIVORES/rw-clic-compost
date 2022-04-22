import { Form, TextField, NumberField, SelectField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import GeocoderCell from 'src/components/GeocoderCell'
import CustomerCell from 'src/components/CustomerCell'
import PaymentMethodCell from 'src/components/PaymentMethodCell'
import PaymentCell from 'src/components/PaymentCell'
import SMSCell from 'src/components/SMSCell'


const LocationPage = () => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 50/12
  const LITER_BY_MEAL = 1
  const WEIGHT_BY_LITER = 1/3
  
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
    <>
      <h1>FRONT FUNCTIONS</h1>
      <p>Localisation &gt; Estimation &gt; Prestation &gt; Client &gt; Moyen de paiement &gt; Paiement &gt; SMS</p>
      <hr/>
      <Form onSubmit={formLocation} style={{ fontSize: '2rem' }}>
        <label htmlfor="location">Localisation :</label><br/>
        <TextField name="location" placeholder="Adresse"/>
        <Submit>Calculer</Submit>      
      </Form>
      {location && <GeocoderCell query={location} />}
      <hr/>
      <Form onSubmit={formPrice} style={{ fontSize: '2rem' }}>
        <label htmlfor="meals">Estimation :</label><br/>
        <NumberField name="meals" placeholder="Repas par semaine"/>
        <Submit>Estimer</Submit>
      </Form>
      <p>
        &gt; Nombre de repas : {(meals*WEEKS_BY_MONTH).toFixed(0)} repas par mois <br/>
        &gt; Volume estimé : {(meals*LITER_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} L par mois<br/>
        &gt; Poids estimé : {(meals*LITER_BY_MEAL*WEIGHT_BY_LITER*WEEKS_BY_MONTH).toFixed(0)} kg par mois<br/>
        &gt; Tarif estimé : {(meals*LITER_BY_MEAL*PRICE_BY_LITER*WEEKS_BY_MONTH).toFixed(2)} € HT par mois<br/>
        &gt; Coût par repas : {(LITER_BY_MEAL*PRICE_BY_LITER).toFixed(2)} € HT
      </p>
      <hr/>
      <Form onSubmit={formService} style={{ fontSize: '2rem' }}>
        <label htmlfor="service">Prestation :</label>
          <SelectField name="service" multiple={false}>
            <option>{(meals*LITER_BY_MEAL/22).toFixed(0)}x bioseau 22L par semaine</option>
            <option>{(meals*LITER_BY_MEAL/120).toFixed(0)}x bac roulant 120L par semaine</option>
            <option>{(meals*LITER_BY_MEAL/300).toFixed(0)}x caisse palette 300L par semaine</option>
          </SelectField>
          <Submit>Choisir</Submit>
      </Form>
      <p>&gt; Service : {service}</p>
      <hr/>
      <Form onSubmit={formCustomer} style={{ fontSize: '2rem' }}>
        <label htmlfor="customer">Client :</label><br/>
        <TextField name="customer" placeholder="description"/>
        <Submit>Ajouter</Submit>
      </Form>
      <p>&gt; Client : {customer && <CustomerCell query={customer} />}</p>
      <hr/>
      <Form onSubmit={formPaymentMethod} style={{ fontSize: '2rem' }}>
        <label htmlfor="paymentMethod">Méthode de paiement :</label><br/>
        <TextField name="paymentMethod" placeholder="Numéro de carte"/>
        <Submit>Ajouter</Submit>
      </Form>
      <p>&gt; Méthode de paiement : {paymentMethod && <PaymentMethodCell query={paymentMethod} />}</p>
      <hr/>
      <Form onSubmit={formPayment} style={{ fontSize: '2rem' }}>
        <label htmlfor="payment">Paiement :</label><br/>
        <NumberField name="payment" placeholder="Tarif"/>
        <Submit>Payer</Submit>
      </Form>
      <p>&gt; Paiement : {payment && <PaymentCell query={payment} />}</p>
      <hr/>
      <Form onSubmit={formSMS} style={{ fontSize: '2rem' }}>
        <label htmlfor="SMS">SMS :</label><br/>
        <TextField name="sms" placeholder="Message"/>
        <Submit>Envoyer</Submit>
      </Form>
      <p>&gt; SMS : {sms && <SMSCell query={sms} />}</p>
    </>
  )
}

export default LocationPage
