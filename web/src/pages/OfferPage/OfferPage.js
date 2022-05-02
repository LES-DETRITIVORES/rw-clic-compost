import { back, Redirect, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { Form, Label, TextField, NumberField, EmailField, TelField, DateField, Submit } from '@redwoodjs/forms'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import Offers from 'src/components/Offers'


const OfferPage = ({l, m}) => {
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const [service, setService] = useState()
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
      <div>
        <div>
          <Link to={routes.search({l:location, m:meals})}>&lt; Modifier votre recherche</Link>
        </div>
        <div className="font-medium text-center text-2xl md:text-3xl mt-16">
          Choisissez la solution de tri qui vous ressemble
        </div>
        <div className="text-center">
          {location} - {meals} repas par semaine
        </div>
        <div className="container mx-auto max-w-3xl font-sans">
          {location &&
            <div className="text-center bg-white rounded-lg shadow-lg p-4 mt-8 text-lg">
              <GeocoderCell query={location}/>
            </div>
          }
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2"> 
            <div>
              <div className="mt-8 text-lg">
                <Offers meals={meals} onChange={setService}/>
              </div>
            </div>
            <div>
              <Form onSubmit={subscriptionSubmit} className="container mx-auto font-sans">
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block">
                    Prénom
                  </Label>
                  <TextField name="firstname" className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Nom
                  </Label>
                  <TextField name="lastname" className="uppercase block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Société
                  </Label>
                  <TextField name="company" className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Mél
                  </Label>
                  <EmailField name="email" className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Téléphone
                  </Label>
                  <TelField name="phone" className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                </div>
                <div>
                    <Submit
                      className="sm:text-sm md:text-lg uppercase font-bold bg-orange-600 rounded-b-md p-4 text-white w-full shadow-lg">
                        Essayer gratuitement
                    </Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OfferPage
