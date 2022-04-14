import { Form, TextField, NumberField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import GeocoderCell from 'src/components/GeocoderCell'

const LocationPage = () => {
  const [query, setQuery] = useState()
  const [meals, setMeals] = useState()
  const PRICE_BY_MEAL = (0.16*52/12).toFixed(2)
  const onSubmit = (data) => {
    setQuery(data.query)
    setMeals(data.meals)
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ fontSize: '2rem' }}>
        <label htmlfor="query">Adresse :</label>
        <TextField name="query" placeholder="ex: 65 quai de Brazza 33100 Bordeaux"/>
        <br/>
        <label htmlfor="meals">Repas par semaine :</label>
        <NumberField name="meals" placeholder="200"/>
        <br/>
        <Submit>Estimer</Submit>
      </Form>
      > Distance : {query && <GeocoderCell query={query} />}

      > Volume estimé : {(meals*52/12).toFixed(0)} L par mois<br/>
      > Poids estimé : {(meals*52/12*0.4).toFixed(0)} kg par mois<br/>
      > Tarif estimé : {meals*PRICE_BY_MEAL} € HT par mois<br/>
      > Coût par repas : {PRICE_BY_MEAL} € HT
    </>
  )
}

export default LocationPage
