import { Form, TextField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import GeocoderCell from 'src/components/GeocoderCell'

const LocationPage = () => {
  const [zip, setZip] = useState()

  const onSubmit = (data) => {
    setZip(data.zip)
  }

  return (
    <>
      <Form onSubmit={onSubmit} style={{ fontSize: '2rem' }}>
        <TextField
          name="zip"
          placeholder="Zip code"
          maxLength="5"
          validation={{ required: true, pattern: /^\d{5}$/ }}
        />
        <Submit>Go</Submit>
      </Form>
      {zip && <GeocoderCell zip={zip} />}
    </>
  )
}

export default LocationPage
