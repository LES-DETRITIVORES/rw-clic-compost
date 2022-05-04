import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { Form, Label, TextField, EmailField, TelField, Submit } from '@redwoodjs/forms'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import Offers from 'src/components/Offers'


const OfferPage = ({l, m, s, f, n, c, e, p}) => {
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const [service, setService] = useState(s)

  const offerSubmit = (data) => {
    const sub = {
      f : data.firstname,
      n : data.lastname,
      c : data.company,
      e : data.email,
      p : data.phone,
      l : location,
      m : meals,
      s : service,
    }
    console.log(JSON.stringify(sub))
    navigate(routes.subscribe(sub))
  }
  
  return (
    <>
      <MetaTags title="Offer" description="Offer page" />
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
                <Offers meals={meals} onChange={setService} defaultValue={service}/>
              </div>
            </div>
            <div>
              <Form onSubmit={offerSubmit} className="container mx-auto font-sans">
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
                  <Label className="font-medium block">
                    Société
                  </Label>
                  <TextField name="company" defaultValue={c} className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Prénom
                  </Label>
                  <TextField name="firstname" defaultValue={f} className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Nom
                  </Label>
                  <TextField name="lastname" defaultValue={n} className="uppercase block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Mél
                  </Label>
                  <EmailField name="email" defaultValue={e} className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                  <Label className="font-medium block">
                    Téléphone
                  </Label>
                  <TelField name="phone" defaultValue={p} className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"/>
                </div>
                <div>
                    <Submit
                      className={`sm:text-sm md:text-lg uppercase font-bold ${service ? 'bg-orange-600' : 'bg-gray-600'}  rounded-b-md p-4 text-white w-full shadow-lg`}
                      disabled={!service}>
                        S'inscrire gratuitement
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
