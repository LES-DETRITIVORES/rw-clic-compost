import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import GeocoderCell from 'src/components/GeocoderCell'

const LocationPage = () => {
  const [query, setQuery] = useState()

  const onSubmit = (data) => {
    setQuery(data.query)
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ fontSize: '2rem' }}>
        <TextField
          name="query"
          placeholder="Address"
        />
        <Submit>Go</Submit>
      </Form>
      {query && <GeocoderCell query={query} />}
    </>
  )
}

export default LocationPage
