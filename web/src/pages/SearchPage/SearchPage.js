import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, TextField, NumberField, Submit } from '@redwoodjs/forms'
import { Combobox, Transition } from '@headlessui/react'
import LocationsCell from 'src/components/LocationsCell'
import LocationSearch from 'src/components/LocationSearch/LocationSearch'

const SearchPage = () => {
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState()
  const [meals, setMeals] = useState()

  const formSearch = (data) => {
    setLocation(selected)
    setMeals(data.meals)
  }

  return (
  <>
    <MetaTags title="Recherche" description="Trouver la meilleure solution pour vos déchets organiques" />
    <div>
      <div className="font-medium text-center sm:text-2xl md:text-3xl mt-16">
        Trouvez la meilleure solution pour composter vos déchets organiques
      </div>
      <Form onSubmit={formSearch} className="container mx-auto max-w-xl font-sans">
        <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
          <div className="font-medium">
            Adresse à collecter
          </div>
          <div className="w-full">
            <Combobox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <div>
                  <Combobox.Input
                    className="w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"
                    displayValue={(loc) => loc}
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
          <div className="font-medium mt-6">
            Repas par semaine
          </div>
          <div>
            <NumberField name="meals" className="bg-gray-200 rounded-md p-2 text-sm outline-green-800" />
          </div>
        </div>
        <div>
            <Submit className="sm:text-sm md:text-lg uppercase font-bold bg-green-800 rounded-b-md p-4 text-white w-full shadow-lg">Chercher une solution locale</Submit>
        </div>
      </Form>
      {location} - {meals}
    </div>
    </>
  )
}

export default SearchPage
