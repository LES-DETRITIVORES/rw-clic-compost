import { useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import LocationsCell from 'src/components/LocationsCell'

const LocationSearch = () => {
const [selected, setSelected] = useState()
const [query, setQuery] = useState('')

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div>
            <Combobox.Input
              className="w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"
              displayValue={(location) => location}
              onChange={(event) => setQuery(event.target.value)}
              autocomplete="off"
            />
          </div>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <LocationsCell query={query}/>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default LocationSearch
