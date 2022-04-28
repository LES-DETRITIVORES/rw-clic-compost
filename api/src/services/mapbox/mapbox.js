import { fetch } from 'cross-undici-fetch'

export const location = async ({ query }) => {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiaHV5bmhkb28iLCJhIjoiY2wxdG51ZHhlMjAycTNlcGRwOWF2bDFlayJ9.l57fl18hef762dVeBgz71Q'
  // console.log( `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&types=postcode&access_token=${MAPBOX_TOKEN}`)
  const response = await fetch(
  //  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&access_token=${MAPBOX_TOKEN}`
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${MAPBOX_TOKEN}`
  )
  const json = await response.json()

  return {
    query,
    address: json.features[0].place_name,
    longitude: json.features[0].center[0],
    latitude: json.features[0].center[1],
  }
}

export const locations = async ({ query }) => {
  const MAPBOX_TOKEN = 'pk.eyJ1IjoiaHV5bmhkb28iLCJhIjoiY2wxdG51ZHhlMjAycTNlcGRwOWF2bDFlayJ9.l57fl18hef762dVeBgz71Q'
  // console.log( `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&types=postcode&access_token=${MAPBOX_TOKEN}`)
  const response = await fetch(
  //  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&access_token=${MAPBOX_TOKEN}`
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=fr&proximity=ip&types=address&language=fr&access_token=${MAPBOX_TOKEN}`
  )
  const json = await response.json()

  return json.features
}