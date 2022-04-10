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
  return (
    <section>
        <h1>{geocoder.address}</h1>
        <h2>
          <span>
            {geocoder.longitude}, {geocoder.latitude}
          </span>
        </h2>
      </section>
  )
}
