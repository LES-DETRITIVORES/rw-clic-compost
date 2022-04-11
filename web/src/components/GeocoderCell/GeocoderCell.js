import * as turf from '@turf/turf'

export const QUERY = gql`
  query GetGeocoderQuery($zip: String!) {
    geocoder: getLocation(zip: $zip) {
      zip,
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
  var from = turf.point([-0.580036, 44.841225]);
  var to = turf.point([geocoder.longitude, geocoder.latitude]);
  var options = {units: 'kilometers'};
  var distance = turf.distance(from, to, options);

  return (
    <section>
        <h1>{geocoder.address}</h1>
        <h2>
          <p>
            [{geocoder.longitude}, {geocoder.latitude}]
          </p>
          <p>
            {Math.round(distance)} km from HQ (65 quai de Brazza 33000 Bordeaux)
          </p>
        </h2>
      </section>
  )
}
