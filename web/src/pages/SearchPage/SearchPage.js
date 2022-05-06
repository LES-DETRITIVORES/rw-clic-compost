import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, NumberField, Submit } from '@redwoodjs/forms'
import LocationField from 'src/components/Location/LocationField'

const SearchPage = ({l, m}) => {
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const [service, setService] = useState()

  const logger = (log) => {
    console.log(log)
  }

  const searchSubmit = (data) => {
    console.log(JSON.stringify(data))
    // setLocation(selected)
    // setMeals(data.meals)
    navigate(routes.offer({l:location, m:meals}))
  }

  return (
  <>
    <MetaTags title="Recherche" description="Trouvez la meilleure solution de tri des déchets organiques" />
    <div className="flex flex-row">
      <div className="basis-auto md:basis-1/2"></div>
      <div className="basis-full md:basis-2/2">
        <div className="font-bold text-center text-3xl md:text-5xl mt-16 text-white  w-min mx-auto -rotate-2">
          <span className="bg-green-900 p-1 block w-min">Restaurateurs, </span> 
          <span className="bg-green-900 p-1 block w-min mt-1">Prêts&nbsp;à&nbsp;trier&nbsp;vos&nbsp;biodéchets&nbsp;?</span>
        </div>
        <div className="container mx-auto max-w-xl font-sans">
          <div></div>
          <Form onSubmit={searchSubmit}>
            <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8 text-center">
              <Label className="font-medium block">
                Adresse à trier
              </Label>
              <LocationField value={location} onChange={setLocation} className="block text-center w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"/>
              <Label className="font-medium mt-6 block">
                Repas par semaine
              </Label>
              <NumberField onChange={(e) => setMeals(e.target.value)} value={meals} name="meals" className="block w-full text-center bg-gray-200 rounded-md p-2 text-sm outline-green-800" />
            </div>
            <div>
                <Submit
                  disabled={!location || !meals}
                  className={`sm:text-sm md:text-lg uppercase font-bold ${(location && meals) ? 'bg-green-800' : 'bg-gray-600'} rounded-b-md p-4 text-white w-full shadow-lg`}>Chercher une solution locale</Submit>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </>
  )
}

export default SearchPage
