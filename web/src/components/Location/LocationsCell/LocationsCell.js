import Locations from 'src/components/Location/Locations'

export const QUERY = gql`
  query FindLocations($query: String!) {
    locations: locations(query: $query) {
      id
      place_name
    }
  }
`

export const Loading = () => {return null}

export const Empty = () => {return null}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ locations }) => {
  return <Locations locations={locations}/>
}
