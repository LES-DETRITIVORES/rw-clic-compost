import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

const Locations = ({ locations }) => {
  return (
    <Combobox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
      {locations.length === 0 && query !== '' ? (
        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
          Aucune adresse trouv&eacute;e.
        </div>
      ) : (
        locations.map((location) => (
          <Combobox.Option
            key={location.id}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? 'bg-teal-600 text-white' : 'text-gray-900'
              }`
            }
            value={location.place_name}
          >
            {({ selected, active }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? 'font-medium' : 'font-normal'
                  }`}
                >
                  {location.place_name}
                </span>
                {selected ? (
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                      active ? 'text-white' : 'text-teal-600'
                    }`}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  )
}

export default Locations
