import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, TextField, NumberField, Submit } from '@redwoodjs/forms'
import LocationField from 'src/components/Location/LocationField'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import Offers from 'src/components/Offers'

const SearchPage = () => {
  const [location, setLocation] = useState()
  const [meals, setMeals] = useState()
  const [offer, setOffer] = useState()

  const logger = (log) => {
    console.log(log)
  }

  const formSubmit = (data) => {
    console.log(JSON.stringify(data))
    // setLocation(selected)
    // setMeals(data.meals)
  }

  const commandSubmit = () => {
    var command = {
      location : location,
      meals : meals,
      offer : offer,
    }
    console.log(JSON.stringify(command))
  }

  return (
  <>
    <MetaTags title="Recherche" description="Trouver la meilleure solution pour vos déchets organiques" />
    <div>
      <div className="font-medium text-center sm:text-2xl md:text-3xl mt-16">
        Trouvez la meilleure solution pour composter vos déchets organiques
      </div>
      <Form onSubmit={formSubmit} className="container mx-auto max-w-xl font-sans text-center">
        <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
          <Label className="font-medium">
            Adresse à collecter
          </Label>
          <div className="w-full">
            <LocationField onChange={setLocation} className="text-center w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"/>
          </div>
          <div className="font-medium mt-6">
            Repas par semaine
          </div>
          <div>
            <NumberField onChange={(e) => setMeals(e.target.value)} name="meals" className="text-center w-1/4 bg-gray-200 rounded-md p-2 text-sm outline-green-800" />
          </div>
        </div>
        <div>
            <Submit
              disabled={location == null || meals == null}
              className="sm:text-sm md:text-lg uppercase font-bold bg-green-800 rounded-b-md p-4 text-white w-full shadow-lg">Chercher une solution locale</Submit>
        </div>
      </Form>
    </div>
    <div className="container mx-auto max-w-xl font-sans">
      {location &&
        <div className="text-center mt-8 bg-white rounded-lg shadow-lg p-4 mt-8 text-lg">
          <GeocoderCell query={location}/>
        </div>
      }
      {meals &&
        <div className="mt-8 mt-8 text-lg">
          <Offers meals={meals} onChange={setOffer}/>
        </div>
      }
      {location && meals && offer &&
        <Submit onClick={commandSubmit} className="mt-16 sm:text-sm md:text-lg uppercase font-bold bg-orange-600 rounded-md p-4 text-white w-full shadow-lg">Adhérer</Submit>
      }
    </div>
  </>
  )
}

export default SearchPage
