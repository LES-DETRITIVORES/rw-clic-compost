import { fetch } from 'cross-undici-fetch'

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN

export const location = async ({ query }) => {
  // console.log( `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&types=postcode&access_token=${MAPBOX_TOKEN}`)
  const response = await fetch(
  //  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&access_token=${MAPBOX_TOKEN}`
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&types=address&language=fr&access_token=${MAPBOX_TOKEN}`
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
  // console.log( `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&types=postcode&access_token=${MAPBOX_TOKEN}`)
  const response = await fetch(
  //  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=-0.580036%2C44.841225&access_token=${MAPBOX_TOKEN}`
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=fr&proximity=-0.580036%2C44.841225&types=address&language=fr&access_token=${MAPBOX_TOKEN}`
  )
  const json = await response.json()

  return json.features
}
