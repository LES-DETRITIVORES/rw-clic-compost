import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

const Offers = ({meals}) => {
  const PRICE_BY_LITER = 0.15
  const WEEKS_BY_MONTH = 52/12
  const WEIGHT_BY_MEAL = 0.14
  const WEIGHT_BY_LITER = 1/3
  const LITER_BY_MEAL = WEIGHT_BY_MEAL/WEIGHT_BY_LITER+0.08 // 0.42 + 0.08 = 0.5

  const [service, setService] = useState()
  const formService = (data) => {
    setService(data.service)
  }

  return (
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
  )
}

export default Offers
