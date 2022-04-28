import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import LocationSearch from 'src/components/LocationSearch/LocationSearch'

const SearchPage = () => {
  return (
  <>
    <MetaTags title="Recherche" description="Trouver la meilleure solution pour vos déchets organiques" />
    <div>  
      <div className="font-medium text-center sm:text-2xl md:text-3xl mt-16">
        Trouver la meilleure solution pour vos déchets organiques
      </div>
      <div className="container mx-auto max-w-xl font-sans">
        <div className="bg-white rounded-t-lg shadow-lg p-8 mt-8">
          <div className="font-medium">
            Adresse à collecter
          </div>
          <div>
            <LocationSearch/>
          </div>
          <div className="font-medium mt-6">
            Repas par semaine
          </div>
          <div>
            <input type="number" className="bg-gray-200 rounded-md p-2"></input>   
          </div>
        </div>
        <div>
            <button className="sm:text-sm md:text-lg uppercase font-bold bg-green-800 rounded-b-md p-4 text-white w-full shadow-lg">Rechercher une solution</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default SearchPage
