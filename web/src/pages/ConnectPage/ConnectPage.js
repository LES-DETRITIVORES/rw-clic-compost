import { navigate, routes } from '@redwoodjs/router'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TelField,
  Submit,
} from '@redwoodjs/forms'

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '')
  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
  if (match) {
    return (
      match[1] +
      ' ' +
      match[2] +
      ' ' +
      match[3] +
      ' ' +
      match[4] +
      ' ' +
      match[5]
    )
  }
  return null
}

const ConnectPage = (props) => {
  const onSubmit = (data) => {
    console.info(data)
    navigate(routes.location())
  }

  return (
    <div className="min-h-screen py-6 px-6 flex flex-col justify-center sm:py-12 relative sm:max-w-xl sm:mx-auto space-y-12">
      <div>
        <img src="/logo.png" className="object-contain h-48 w-full" />
      </div>
      <Form
        onSubmit={onSubmit}
        error={props.error}
        className="font-semibold space-y-10 mb-20 text-center"
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <div className="transform -rotate-2">
          <Label name="name" className={CSS.label}>
            Votre <span className={CSS.keyword}>nom</span> ?
          </Label>
          <TextField
            name="name"
            defaultValue={props.order?.name}
            placeholder="John Doe"
            className={CSS.input}
            validation={{
              required: true,
              message: 'Désolé, le nom est obligatoire',
            }}
          />
          <FieldError
            name="name"
            className="rw-field-error"
            message="Désolé, le nom est obligatoire"
          />
        </div>
        <div className="transform rotate-2">
          <Label name="phone" className={CSS.label}>
            Un <span className={CSS.keyword}>téléphone</span> ?
          </Label>
          <TelField
            name="phone"
            defaultValue={props.order?.phone}
            placeholder="06 78 91 01 23"
            className={CSS.input}
            maxLength="10"
            transformValue={(str) => formatPhoneNumber(str)}
            validation={{
              required: true,
              minLength: 10,
              message: 'Désolé, ce numéro est incorrect',
            }}
          />
          <FieldError name="phone" className="rw-field-error" />
        </div>
        <Submit
          data-action="publish"
          disabled={props.loading}
          className={CSS.next}
        >
          Je m'identifie
        </Submit>
      </Form>
    </div>
  )
}

export default ConnectPage
