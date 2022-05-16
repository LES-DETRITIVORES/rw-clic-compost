import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { Form, Label, TextField, EmailField, TelField, Submit } from '@redwoodjs/forms'
import Offers from 'src/components/Offers'


const OfferPage = ({l, m, s, f, n, c, e, p}) => {
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const [service, setService] = useState(s)

  const offerSubmit = (data) => {
    var subscription =
      {
        f : data.firstname,
        n : data.lastname,
        c : data.company,
        e : data.email,
        p : data.phone,
        l : location,
        m : meals,
        s : service,
      }
    console.log(JSON.stringify(subscription))
    navigate(routes.subscribe(subscription))
  }
  
  return (
    <>
      <MetaTags title="Offer" description="Offer page" />
      <div>
        <div>
          <Link className="text-white" to={routes.search({l:location, m:meals})}>&lt; Changer d'adresse</Link>
        </div>
        <div className="font-bold text-center text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
          <span className="bg-orange-600 p-1 block w-min">Choisissez,</span> 
          <span className="bg-orange-600 p-1 block w-min mt-1">On&nbsp;s'occupe&nbsp;de&nbsp;vous&nbsp;!</span>
        </div>
        <div className="container mx-auto max-w-3xl font-sans">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2"> 
            <div>
              <div className="mt-8 text-lg">
                <Offers meals={meals} onChange={setService} defaultValue={s}/>
              </div>
            </div>
            <div>
              <Form onSubmit={offerSubmit} className="container mx-auto font-sans">
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8 space-y-3">
                  <div>
                    <Label 
                      name="company" 
                      className="font-medium block" 
                      errorClassName="font-medium block text-red-600">
                      Société
                    </Label>
                    <TextField 
                      name="company" 
                      defaultValue={c} 
                      className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label 
                      name="firstname" 
                      className="font-medium block" 
                      errorClassName="font-medium block text-red-600">
                        Prénom
                    </Label>
                    <TextField 
                      name="firstname" 
                      defaultValue={f} 
                      className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label 
                      name="lastname"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600">
                      Nom
                    </Label>
                    <TextField 
                      name="lastname" 
                      defaultValue={n} 
                      className="uppercase block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}  
                    />
                  </div>                  
                  <div>
                    <Label 
                      name="email"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600">
                      Mél
                    </Label>
                    <EmailField 
                      name="email" 
                      defaultValue={e} 
                      className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label 
                      name="phone"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600">
                      Téléphone
                    </Label>
                    <TelField 
                      name="phone" 
                      defaultValue={p} 
                      className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                </div>
                <div>
                    <Submit
                      className={`sm:text-sm md:text-lg uppercase font-bold ${service && location && meals ? 'bg-orange-600' : 'bg-gray-600'}  rounded-b-md p-4 text-white w-full shadow-lg`}
                      disabled={!service || !location || !meals}>
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
