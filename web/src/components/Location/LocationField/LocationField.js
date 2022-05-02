import { useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import LocationsCell from 'src/components/Location/LocationsCell'

const LocationField = ({onChange, className, value}) => {
  const [query, setQuery] = useState(value)
  const [location, setLocation] = useState(value)

  return (
    <Combobox value={location} onChange={(e) => {onChange(e); setLocation(e)}}>
      <div className="relative mt-1">
        <div>
          <Combobox.Input
            className={className}
            displayValue={(loc) => loc}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <LocationsCell query={query} />
        </Transition>
      </div>
    </Combobox>
  )
}

export default LocationField
