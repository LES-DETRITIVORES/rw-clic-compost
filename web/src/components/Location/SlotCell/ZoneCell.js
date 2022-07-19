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

export const Loading = () => <p className="text-gray-400">Recherche des créneaux disponibles...</p>

export const Empty = () => <div>Aucune réponse</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ geocoder }) => {
  var from = turf.point([-0.548885, 44.856188]);
  var to = turf.point([geocoder.longitude, geocoder.latitude]);
  var options = {units: 'kilometers'};
  var distance = turf.distance(from, to, options);
  const MAX_DISTANCE = 3

  return (
    <>
      {(distance <= MAX_DISTANCE) &&
        <div className="text-center mt-3 text-sm">9h - 12h</div>
      }
      {(distance > MAX_DISTANCE) &&
        <div className="text-center mt-3 text-sm">13h - 15h</div>
      }
    </>
  )
}
