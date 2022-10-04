import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

const Offers = ({meals, onOffer, onService, onRate, defaultValue}) => {
  const PRICE_BY_LITER = 0.25 // Add Tax 20%
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
        return a.rate - b.rate;  
      }
    )[0].index;
  }

  function loadOffer(index) {
    onOffer(index);
    onService(offers[index-1].service);
    onRate(offers[index-1].rate)
  }
  
  const offers = [
    {
      index: '1',
      name: 'Bioseau',
      liter: 22,
      dimensions: "29 x 42 x 28 cm (l x L x h)",
      get qty() {return Math.max(Math.round(meals*LITER_BY_MEAL/this.liter), meals == 0 ? 1 : 2)},
      get rate() {return parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter + 'L'}
    },
    {
      index: '2',
      name : 'Bac roulant',
      liter : 120,
      dimensions : "50,5 x p 55,5 x h 100,5 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get rate() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter + 'L'}
    },
    {
      index: '3',
      name : 'Caisse-palette standard',
      liter : 250,
      dimensions : "79,5 x 119,5 x 79 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get rate() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter + 'L'}
    },
    {
      index: '4',
      name : 'Caisse-palette XL',
      liter : 500,
      dimensions : "79,5 x 119,5 x 79 cm (l x L x h)",
      get qty() {return Math.round(meals*LITER_BY_MEAL/this.liter)},
      get rate() {return  parseFloat((this.qty*this.liter*PRICE_BY_LITER).toFixed(2))},
      get service() {return this.qty + 'x ' + this.name + ' ' + this.liter + 'L'}
    },
  ]
  
  // Initialize best offer
  const [index, setIndex] = defaultValue ? useState(defaultValue) : useState(bestOffer(offers))
  
  return (
    <>
      <RadioGroup className="space-y-2"
                  value={index}
                  onLoad={loadOffer(index)}
                  onChange={(e) => {setIndex(e);
                                    loadOffer(e)}}>
        {
          offers.map((offer) => (
            <>
            {offer.qty > 0 ?
              <RadioGroup.Option value={offer.index} className={({ checked }) =>
                `${
                  checked ? 'bg-orange-600 text-white' : 'bg-white'
                }
                  relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
              }>
              {({ checked }) => (
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
                          {meals == 0 && <span className="block font-bold">{(offer.rate*1.2).toFixed(2)}€ TTC / semaine</span>}
                          {meals > 0 && <span className="block font-bold">{offer.rate.toFixed(2)}€ HT / semaine ({(offer.rate/meals).toFixed(2)} € HT / repas)</span>}
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