import { navigate, routes, Link } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, NumberField, RadioField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import LocationField from 'src/components/Location/LocationField'
import GeocoderCell from 'src/components/Location/GeocoderCell'
import LoginCell from 'src/components/User/LoginCell'

const SearchPage = ({ u, l, m }) => {
  const [profile, setProfile] = useState(u)
  const [location, setLocation] = useState(l)
  const [meals, setMeals] = useState(m)
  const { currentUser, isAuthenticated, logOut } = useAuth()

  const logger = (log) => {
    console.log(log)
  }

  const searchSubmit = (data) => {
    console.log(JSON.stringify(data))
    navigate(routes.offer({ u: profile, l: location, m: meals }))
  }

  return (
    <>
      <MetaTags
        title="Recherche"
        description="Trouvez la meilleure solution de tri pour vos restes alimentaires et biodéchets"
      />
      <div className="text-white text-right">
        {isAuthenticated && (
          <span>
            <span className="text-sm font-light">
              [<LoginCell id={currentUser.id} />]
            </span>
            &nbsp;
            <Link
              className="underline cursor-pointer font-medium text-md"
              onClick={logOut}
            >
              Se déconnecter
            </Link>
          </span>
        )}
        {!isAuthenticated && (
          <>
            <div className="inline-flex items-center space-x-2 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Link
                className="cursor-pointer font-medium text-md"
                to={routes.book()}
              >
                Espace usager
                <div className="group-hover:bg-white w-full h-0.5 transition" />
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-center text-xl sm:text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
          <span className="bg-green-900 p-1 block w-min mt-1">
            Clic&nbsp;&amp;&nbsp;Compost
          </span>
          <span className="bg-green-900 p-1 block w-min mt-1">
            Prêts&nbsp;à&nbsp;trier&nbsp;vos&nbsp;biodéchets&nbsp;?
          </span>
        </div>
        <div className="container mx-auto max-w-xl font-sans">
          <div></div>
          <Form onSubmit={searchSubmit}>
            <div
              className={`bg-white shadow-lg p-8 mt-8 text-center ${
                profile ? 'rounded-t-lg' : 'rounded-lg'
              }`}
            >
              <Label className="font-medium block mb-2">Je suis...</Label>
              <RadioGroup
                value={profile}
                onChange={setProfile}
                className="flex flex-row gap-4"
              >
                <RadioGroup.Option
                  value="particulier"
                  className={({ checked }) =>
                    `basis-1/2 border border-gray-100 hover:border-green-900 transition rounded-lg shadow-md p-6 cursor-pointer ${
                      checked ? 'bg-green-900 text-white' : 'bg-white'
                    }`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium ${
                        checked ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Un particulier
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="professionnel"
                  className={({ checked }) =>
                    `basis-1/2 border border-gray-100 hover:border-green-900 transition rounded-lg shadow-md p-6 cursor-pointer ${
                      checked ? 'bg-green-900 text-white' : 'bg-white'
                    }`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium ${
                        checked ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Un professionnel
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
              {profile && (
                <>
                  <Label name="location" className="font-medium mt-6 block">
                    Adresse à trier
                  </Label>
                  <LocationField
                    name="location"
                    value={location}
                    onChange={setLocation}
                    className="block text-center w-full transition rounded-md bg-gray-200 py-2 pl-3 pr-10 text-sm outline-green-800 leading-5 text-gray-900 focus:ring-0"
                  />
                  {location && <GeocoderCell query={location} />}
                  {profile == 'professionnel' && (
                    <>
                      <Label name="meals" className="font-medium mt-6 block">
                        Repas par semaine
                      </Label>
                      <NumberField
                        name="meals"
                        onChange={(e) => setMeals(e.target.value)}
                        value={meals}
                        className="block w-1/3 mx-auto transition text-center bg-gray-200 rounded-md p-2 text-sm outline-green-800"
                      />
                    </>
                  )}
                </>
              )}
            </div>
            <div>
              {profile == 'particulier' && (
                <Submit
                  disabled={!profile || !location}
                  className={`text-xs sm:text-sm md:text-lg uppercase font-bold ${
                    profile && location
                      ? 'bg-green-800 cursor-pointer'
                      : 'bg-gray-600'
                  } rounded-b-md p-4 text-white w-full shadow-lg`}
                >
                  Chercher une solution locale
                </Submit>
              )}
              {profile == 'professionnel' && (
                <Submit
                  disabled={!profile || !location || !meals}
                  className={`text-xs sm:text-sm md:text-lg uppercase font-bold ${
                    profile && location && meals
                      ? 'bg-green-800 cursor-pointer'
                      : 'bg-gray-600'
                  } rounded-b-md p-4 text-white w-full shadow-lg`}
                >
                  Chercher une solution locale
                </Submit>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SearchPage
