import * as turf from '@turf/turf'

export const QUERY = gql`
  query GetGeocoderQuery($query: String!) {
    geocoder: getLocation(query: $query) {
      query,
      address,
      longitude,
      latitude
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ geocoder }) => {
  var from = turf.point([-0.548885, 44.856188]);
  var to = turf.point([geocoder.longitude, geocoder.latitude]);
  var options = {units: 'kilometers'};
  var distance = turf.distance(from, to, options);

  return (
  <p>
    &gt; Adresse : {geocoder.address}<br/>
    &gt; Coordonnées : [{geocoder.longitude}, {geocoder.latitude}]<br/>
    &gt; Distance : {Math.round(distance)} km from HQ (65 quai de Brazza 33100 Bordeaux)<br/>
  </p>
  )
}
