import { navigate, routes, Link } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, NumberField, RadioField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import LocationField from 'src/components/Location/LocationField'
import GeocoderCell from 'src/components/Location/GeocoderCell'

const SearchPage = ({u, l, m}) => {
  const [profile, setProfile] = useState(u)
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const { currentUser, isAuthenticated, logOut } = useAuth()

  const logger = (log) => {
    console.log(log)
  }

  const searchSubmit = (data) => {
    console.log(JSON.stringify(data))
    navigate(routes.offer({u:profile, l:location, m:meals}))
  }

  return (
  <>
    <MetaTags title="Recherche" description="Trouvez la meilleure solution de tri pour vos restes alimentaires et biodéchets" />
    <div className="text-white text-right">
      {isAuthenticated &&
        <span>
          <span className="text-sm font-light">[<LoginCell id={currentUser.id} />]</span>&nbsp;
          <Link className="underline cursor-pointer font-medium text-md" onClick={logOut}>Se déconnecter</Link>
        </span>
      }
      {!isAuthenticated &&
        <Link className="underline cursor-pointer font-medium text-md" to={routes.book()}>[Espace usager]</Link>
      }
    </div>
    <div className="flex flex-row">
      <div className="basis-auto md:basis-1/2"></div>
      <div className="basis-full md:basis-2/2">
        <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
          <span className="bg-green-900 p-1 block w-min mt-1">Clic&nbsp;&amp;&nbsp;Compost</span>
          <span className="bg-green-900 p-1 block w-min mt-1">Prêts&nbsp;à&nbsp;trier&nbsp;vos&nbsp;biodéchets&nbsp;?</span>
        </div>
        <div className="container mx-auto max-w-xl font-sans">
          <div></div>
            <Form onSubmit={searchSubmit}>
              <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8 text-center">
                <Label className="font-medium block">
                    Je suis...
                </Label>
                <RadioGroup value={profile} onChange={setProfile}
                  className="flex flex-row gap-4">
                  <RadioGroup.Option value="particulier"
                    className={({ checked }) => `basis-1/2 border border-gray-100 hover:border-green-900 rounded-lg shadow-md p-6 cursor-pointer ${checked ? 'bg-green-900 text-white' : 'bg-white'}`}>
                    {({ checked }) => (
                      <RadioGroup.Label as="p" className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}>
                        Un particulier
                      </RadioGroup.Label>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="professionnel"
                    className={({ checked }) => `basis-1/2 border border-gray-100 hover:border-green-900 rounded-lg shadow-md p-6 cursor-pointer ${checked ? 'bg-green-900 text-white' : 'bg-white'}`}>
                    {({ checked }) => (
                      <RadioGroup.Label as="p" className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}>
                        Un professionnel
                      </RadioGroup.Label>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
                {
                  profile &&
                  <>
                    <Label
                      name="location"
                      className="font-medium mt-6 block">
                      Adresse à trier
                    </Label>
                    <LocationField
                      name="location"
                      value={location}
                      onChange={setLocation}
                      className="block text-center w-full rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"
                    />
                    {
                    location &&
                        <GeocoderCell query={location} />
                    }
                    {
                      profile == 'professionnel' &&
                      <>
                        <Label
                          name="meals"
                          className="font-medium mt-6 block">
                          Repas par semaine
                        </Label>
                        <NumberField
                          name="meals"
                          onChange={(e) => setMeals(e.target.value)}
                          value={meals}
                          className="block w-1/3 mx-auto text-center bg-gray-200 rounded-md p-2 text-sm outline-green-800"
                        />
                      </>
                    }
                  </>
                }
              </div>
              <div>
                {profile == "particulier" &&
                  <Submit
                    disabled={!profile || !location }
                    className={`text-xs sm:text-sm md:text-lg uppercase font-bold ${(profile && location) ? 'bg-green-800' : 'bg-gray-600'} rounded-b-md p-4 text-white w-full shadow-lg`}>
                      Chercher une solution locale
                  </Submit>
                }
                {profile == "professionnel" &&
                  <Submit
                    disabled={!profile || !location || !meals}
                    className={`text-xs sm:text-sm md:text-lg uppercase font-bold ${(profile && location && meals) ? 'bg-green-800' : 'bg-gray-600'} rounded-b-md p-4 text-white w-full shadow-lg`}>
                      Chercher une solution locale
                  </Submit>
                }
              </div>
            </Form>
        </div>
      </div>
    </div>
  </>
  )
}

export default SearchPage
