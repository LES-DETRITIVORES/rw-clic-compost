import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, TextField, NumberField, EmailField, TelField, DateField, Submit } from '@redwoodjs/forms'
import LocationField from 'src/components/Location/LocationField'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import Offers from 'src/components/Offers'

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

  const [subscription, setSubscription] = useState()
  const subscriptionSubmit = (data) => {
    var sub = {
      user : data,
      offer : {
        location : location,
        meals : meals,
        service : service,
      }
    }
    console.log(JSON.stringify(sub))
    setSubscription(sub)
  }

  return (
  <>
    <MetaTags title="Recherche" description="Trouvez la meilleure solution de tri des déchets organiques" />
    <div>
      <div className="font-medium text-center text-2xl md:text-3xl mt-16">
        Trouvez la meilleure solution de tri des déchets organiques
      </div>
      <div className="container mx-auto max-w-xl font-sans">
        <Form onSubmit={searchSubmit}>
          <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8 text-center">
            <Label className="font-medium block">
              Adresse à collecter
            </Label>
            <LocationField value={location} onChange={setLocation} className="block text-center w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"/>
            <Label className="font-medium mt-6 block">
              Repas par semaine
            </Label>
            <NumberField onChange={(e) => setMeals(e.target.value)} value={meals} name="meals" className="block w-full text-center bg-gray-200 rounded-md p-2 text-sm outline-green-800" />
          </div>
          <div>
              <Submit
                disabled={location == null || meals == null}
                className="sm:text-sm md:text-lg uppercase font-bold bg-green-800 rounded-b-md p-4 text-white w-full shadow-lg">Chercher une solution locale</Submit>
          </div>
        </Form>
      </div>
    </div>
    { subscription &&
      <div>
        <div className="font-medium text-center text-2xl md:text-3xl mt-16">
          Validez votre contrat de collecte
        </div>
        <div className="container mx-auto max-w-6xl font-sans">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="bg-white rounded-md shadow-lg p-8 mt-8">
                <h1 className="uppercase font-bold text-lg text-center mb-6">Contrat de tri des biodéchets</h1>
                <ul>
                  <li><span className="font-bold">Société : </span><span className="uppercase">{subscription.user.company}</span></li>
                  <li><span className="font-bold">Contact : </span><span className="capitalize">{subscription.user.firstname}</span> <span className="uppercase">{subscription.user.lastname}</span></li>
                  <li><span className="font-bold">Tél : </span><span className="">{subscription.user.phone}</span></li>
                  <li><span className="font-bold">Mél : </span><span className="">{subscription.user.email}</span></li>
                  <li><span className="font-bold">Adresse de collecte : </span><span className="">{subscription.offer.location}</span></li>
                  <li><span className="font-bold">Prestation : </span><span className="lowercase">Collecte et compostage de {subscription.offer.service}</span></li>
                </ul>
              </div>
            </div>
            <div>
              <Form onSubmit={subscriptionSubmit} className="container mx-auto font-sans">
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block">
                    Date de démarrage
                  </Label>
                  <DateField name="startdate" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Numéro carte bleu
                  </Label>
                  <TextField name="card_number" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    IBAN
                  </Label>
                  <TextField name="iban" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                </div>
                <div>
                    <Submit
                      className="sm:text-sm md:text-lg uppercase font-bold bg-blue-600 rounded-b-md p-4 text-white w-full shadow-lg">S'abonner</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default SearchPage
