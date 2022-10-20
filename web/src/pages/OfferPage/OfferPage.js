import { navigate, Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import {
  Form,
  Label,
  TextField,
  EmailField,
  TelField,
  Submit,
} from '@redwoodjs/forms'
import Offers from 'src/components/Offers'

const OfferPage = ({ u, l, m, o, s, r, f, n, c, e, p }) => {
  const [profile, setProfile] = useState(u)
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const [offer, setOffer] = useState(o)
  const [service, setService] = useState(s)
  const [rate, setRate] = useState(r)
  const [company, setCompany] = useState(c)
  const [firstname, setFirstname] = useState(f)
  const [lastname, setLastname] = useState(l)
  const [email, setEmail] = useState(e)
  const [phone, setPhone] = useState(p)

  const offerSubmit = (data) => {
    var subscription = {
      u: profile,
      c: data.company,
      f: data.firstname,
      n: data.lastname,
      e: data.email,
      p: data.phone,
      l: location,
      m: meals,
      o: offer,
      s: service,
      r: rate,
    }
    console.log(JSON.stringify(subscription))
    navigate(routes.subscribe(subscription))
  }

  return (
    <>
      <MetaTags
        title="Offres"
        description="Page de choix de l'offre et renseignement sur l'usager"
      />
      <div>
        <div>
          <Link
            className="text-white"
            to={routes.search({ u: profile, l: location, m: meals })}
          >
            &lt; Modifier ma demande
          </Link>
        </div>
        <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
          <span className="bg-orange-600 p-1 block w-min">Choisissez,</span>
          <span className="bg-orange-600 p-1 block w-min mt-1">
            On&nbsp;s'occupe&nbsp;de&nbsp;vous&nbsp;!
          </span>
        </div>
        <div className="container mx-auto max-w-3xl font-sans">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mt-8 text-lg">
                <Offers
                  meals={profile == 'particulier' ? 0 : meals}
                  onOffer={setOffer}
                  onService={setService}
                  onRate={setRate}
                  defaultValue={offer}
                />
              </div>
            </div>
            <div>
              <Form
                onSubmit={offerSubmit}
                className="container mx-auto font-sans"
              >
                <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8 space-y-3">
                  {profile == 'professionnel' && (
                    <div>
                      <Label
                        name="company"
                        className="font-medium block"
                        errorClassName="font-medium block text-red-600"
                      >
                        Société
                      </Label>
                      <TextField
                        name="company"
                        defaultValue={c}
                        onChange={setCompany}
                        className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                        errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                        validation={{ required: true }}
                      />
                    </div>
                  )}
                  <div>
                    <Label
                      name="firstname"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600"
                    >
                      Prénom
                    </Label>
                    <TextField
                      name="firstname"
                      defaultValue={f}
                      onChange={setFirstname}
                      className="capitalize block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label
                      name="lastname"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600"
                    >
                      Nom
                    </Label>
                    <TextField
                      name="lastname"
                      defaultValue={n}
                      onChange={setLastname}
                      className="uppercase block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label
                      name="email"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600"
                    >
                      Mél
                    </Label>
                    <EmailField
                      name="email"
                      defaultValue={e}
                      onChange={setEmail}
                      className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                  <div>
                    <Label
                      name="phone"
                      className="font-medium block"
                      errorClassName="font-medium block text-red-600"
                    >
                      Téléphone
                    </Label>
                    <TelField
                      name="phone"
                      defaultValue={p}
                      onChange={setPhone}
                      className="block w-full bg-gray-200 rounded-md p-2 text-sm outline-orange-300"
                      errorClassName="block w-full bg-gray-200 rounded-md p-2 text-sm outline-red-600"
                      validation={{ required: true }}
                    />
                  </div>
                </div>
                <div>
                  <Submit
                    className={`sm:text-sm md:text-lg uppercase font-bold ${
                      offer && firstname && lastname && email && phone
                        ? 'bg-orange-600'
                        : 'bg-gray-600'
                    }  rounded-b-md p-4 text-white w-full shadow-lg`}
                    disabled={
                      !(offer && firstname && lastname && email && phone)
                    }
                  >
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
