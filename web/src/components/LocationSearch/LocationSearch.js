import { useState } from 'react'
import { Combobox } from '@headlessui/react'
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
              className="w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(location) => location}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <LocationsCell query={query}/>
        </div>
      </Combobox>
    </div>
  )
}

export default LocationSearch
