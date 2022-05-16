import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Estimate from 'src/components/Estimate'


const Offers = ({meals, onChange, defaultValue}) => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 52/12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1/3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL/WEIGHT_BY_LITER+0.08 // 0.42 + 0.08 = 0.5

  function bestOffer(items) {
    // filter offers with qty
    // sort offers by price
    // return best offer
    return items.filter(item => item.qty > 0).sort(
      function (a, b) {
        return a.price - b.price;  
      }
    )[0].service;
  }

  const offers = [
    {
      name: 'Bioseau',
      liter: 22,
      dimensions: "29 x 42 x 28 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get price() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter +'L - ' + this.price + '€ par semaine'}
    },
    {
      name : 'Bac roulant',
      liter : 120,
      dimensions : "50,5 x p 55,5 x h 100,5 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get price() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter +'L - ' + this.price + '€ par semaine'}
    },
    {
      name : 'Caisse-palette',
      liter : 500,
      dimensions : "79,5 x 119,5 x 79 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get price() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter +'L - ' + this.price + '€ par semaine'}
    },
  ]
  
  // Initialize best offer
  const [service, setService] = defaultValue ? useState(defaultValue) : useState(bestOffer(offers))

  return (
    <>
      <RadioGroup value={service} onLoad={onChange(service)} onChange={(e) => {onChange(e); setService(e)}} className="space-y-2">
        {
          offers.map((offer) => (
            <>
            {offer.qty > 0 ?
              <RadioGroup.Option value={offer.service} className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-offset-2 ring-offset-orange-300 ring-white ring-opacity-60'
                    : ''
                }
                ${
                  checked ? 'bg-orange-600 text-white' : 'bg-white'
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
                          {offer.qty}x {offer.name} {offer.liter}L
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? 'text-green-100' : 'text-gray-500'
                          }`}
                        >
                          <span className="block">{offer.dimensions}</span>
                          <span className="block font-bold">{offer.price.toFixed(2)}€ HT / semaine ({(offer.price/meals).toFixed(2)} € HT / couvert)</span>
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
            : ''}
          </>
        ))}
      </RadioGroup>
    </>
  )
}

export default Offers