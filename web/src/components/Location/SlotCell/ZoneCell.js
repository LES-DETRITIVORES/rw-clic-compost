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

export const Success = ({ geocoder, className }) => {
  var from = turf.point([-0.548885, 44.856188]);
  var to = turf.point([geocoder.longitude, geocoder.latitude]);
  var options = {units: 'kilometers'};
  var distance = turf.distance(from, to, options);
  const MAX_DISTANCE = 3

  return (
    <div className={className}>
      Collecte prévue entre&nbsp;
      <span className="underline font-medium">
        {(distance <= MAX_DISTANCE) && "9h et 12h"}
        {(distance > MAX_DISTANCE) && "12h et 15h"}
      </span>
    </div>
  )
}
