import { Form, TextField, NumberField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import GeocoderCell from 'src/components/GeocoderCell'
import CustomerCell from 'src/components/CustomerCell'
import PaymentMethodCell from 'src/components/PaymentMethodCell'
import PaymentCell from 'src/components/PaymentCell'


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

  return (
    <>
      <Form onSubmit={formLocation} style={{ fontSize: '2rem' }}>
        <label htmlfor="location">Adresse :</label>
        <TextField name="location" placeholder="ex: 65 quai de Brazza 33100 Bordeaux"/>
        <Submit>Calculer</Submit>      
      </Form>
      > Distance : {location && <GeocoderCell query={location} />}<br/>
      <hr/>
      <Form onSubmit={formPrice} style={{ fontSize: '2rem' }}>
        <label htmlfor="meals">Couverts par semaine :</label>
        <NumberField name="meals" placeholder="200"/>
        <Submit>Estimer</Submit>
      </Form>
      > Nombre de repas : {(meals*WEEKS_BY_MONTH).toFixed(0)} repas par mois <br/>
      > Volume estimé : {(meals*LITER_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} L par mois<br/>
      > Poids estimé : {(meals*LITER_BY_MEAL*WEIGHT_BY_LITER*WEEKS_BY_MONTH).toFixed(0)} kg par mois<br/>
      > Tarif estimé : {(meals*LITER_BY_MEAL*PRICE_BY_LITER*WEEKS_BY_MONTH).toFixed(2)} € HT par mois<br/>
      > Coût par repas : {(LITER_BY_MEAL*PRICE_BY_LITER).toFixed(2)} € HT
      <hr/>
      <Form onSubmit={formCustomer} style={{ fontSize: '2rem' }}>
        <label htmlfor="customer">Client :</label>
        <TextField name="customer" placeholder="description"/>
        <Submit>Ajouter</Submit>
      </Form>
      > Client : {customer && <CustomerCell query={customer} />}
      <hr/>
      <Form onSubmit={formPaymentMethod} style={{ fontSize: '2rem' }}>
        <label htmlfor="paymentMethod">Méthode de paiement :</label>
        <TextField name="paymentMethod" placeholder="Numéro de carte"/>
        <Submit>Ajouter</Submit>
      </Form>
      > Méthode de paiement : {paymentMethod && <PaymentMethodCell query={paymentMethod} />}
      <hr/>
      <Form onSubmit={formPayment} style={{ fontSize: '2rem' }}>
        <label htmlfor="payment">Paiement :</label>
        <NumberField name="payment" placeholder="10"/>
        <Submit>Payer</Submit>
      </Form>
      > Paiement : {payment && <PaymentCell query={payment} />}
    </>
  )
}

export default LocationPage
