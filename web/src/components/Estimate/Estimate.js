const Estimate = ({ meals }) => {
  const PRICE_BY_LITER = 0.25
  const WEEKS_BY_MONTH = 52 / 12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1 / 3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL / WEIGHT_BY_LITER + 0.08 // 0.42 + 0.08 = 0.5

  return (
    <ul className="space-y-1 pt-2">
      {/* <li>{(meals*WEEKS_BY_MONTH).toFixed(0)} repas par mois</li> */}
      <li>
        {(meals * WEIGHT_BY_MEAL * WEEKS_BY_MONTH * 12).toFixed(0)} kg par an
      </li>
      <li>
        {(meals * LITER_BY_MEAL * WEEKS_BY_MONTH * 12).toFixed(0)} L par an
      </li>
      <li>
        {(meals * LITER_BY_MEAL * PRICE_BY_LITER * WEEKS_BY_MONTH * 12).toFixed(
          2
        )}{' '}
        € HT par an
      </li>
      <li>{(LITER_BY_MEAL * PRICE_BY_LITER).toFixed(3)} € HT par repas</li>
    </ul>
  )
}

export default Estimate
