import * as turf from '@turf/turf'

export const QUERY = gql`
  query GetGeocoderQuery($query: String!) {
    geocoder: location(query: $query) {
      query,
      address,
      longitude,
      latitude
    }
  }
`

export const Loading = () => <p className="text-gray-400">Recherche de la meilleure solution...</p>

export const Empty = () => <div>Aucune réponse</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ geocoder }) => {
  var from = turf.point([-0.548885, 44.856188]);
  var to = turf.point([geocoder.longitude, geocoder.latitude]);
  var options = {units: 'kilometers'};
  var distance = turf.distance(from, to, options);
  const MAX_DISTANCE = 110

  return (
  /*
  <ul className="list-disc">
    <li>Adresse : {geocoder.address}</li>
    <li>Coordonnées : [{geocoder.longitude}, {geocoder.latitude}]</li>
    <li>Distance : {Math.round(distance)} km from HQ (65 quai de Brazza 33100 Bordeaux)</li>
  </ul>
  */
  <>
    {distance < MAX_DISTANCE
      ? <p className="text-green-600">Bravo, vos biodéchets sont compostables localement :)</p>
      : <p className="text-red-600">Désolé, nous n'avons pas encore de solution locale :(</p>
    }
  </>
  )
}
