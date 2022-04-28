const Estimate = ({meals}) => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 52/12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1/3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL/WEIGHT_BY_LITER+0.08 // 0.42 + 0.08 = 0.5

  return (
    <ul className="list-disc">
      <li>Nombre de repas : {(meals*WEEKS_BY_MONTH).toFixed(0)} repas par mois</li>
      <li>Poids estimé : {(meals*WEIGHT_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} kg par mois</li>
      <li>Volume estimé : {(meals*LITER_BY_MEAL*WEEKS_BY_MONTH).toFixed(0)} L par mois</li>
      <li>Tarif estimé : {(meals*LITER_BY_MEAL*PRICE_BY_LITER*WEEKS_BY_MONTH).toFixed(2)} € HT par mois</li>
      <li>Coût par repas : {(LITER_BY_MEAL*PRICE_BY_LITER).toFixed(3)} € HT</li>
    </ul>
  )
}

export default Estimate
