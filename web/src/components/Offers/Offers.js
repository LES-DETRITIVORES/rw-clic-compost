import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import Estimate from 'src/components/Estimate'


const Offers = ({meals, onChange}) => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 52/12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1/3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL/WEIGHT_BY_LITER+0.08 // 0.42 + 0.08 = 0.5

  const offers = [
    {
      name : 'Bioseau',
      liter : 22,
      qty : Math.round(meals*LITER_BY_MEAL/22)
    },
    {
      name : 'Bac roulant',
      liter : 120,
      qty : Math.round(meals*LITER_BY_MEAL/120)
    },
    {
      name : 'Caisse-palette',
      liter : 500,
      qty :  Math.round(meals*LITER_BY_MEAL/500)
    },
  ]

  const [service, setService] = useState()
  const formService = (data) => {
    setService(data.service)
  }

  return (
    <div className="md:flex md:flex-row pt-4">
      <div className="md:col-span-1 md:basis-1/3">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Estimation</h3>
        <p className="text-sm text-gray-600">
          <Estimate meals={meals} />
        </p>
      </div>
      <div className="md:pl-4 w-full md:basis-2/3">
        <RadioGroup value={service} onChange={(e) => {onChange(e); setService(e)}} className="space-y-2">
          <RadioGroup.Label className="text-lg font-medium leading-6 text-gray-900">Les offres</RadioGroup.Label>
          {
            offers.map((offer) => (
              <>
              {offer.qty > 0 ?
                <RadioGroup.Option value={offer.name} className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-offset-2 ring-offset-green-500 ring-white ring-opacity-60'
                      : ''
                  }
                  ${
                    checked ? 'bg-green-900 bg-opacity-75 text-white' : 'bg-white'
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
                          <span>{(offer.qty*offer.liter*PRICE_BY_LITER).toFixed(2)}€ par semaine</span>
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
      </div>
    </div>
  )
}

export default Offers
