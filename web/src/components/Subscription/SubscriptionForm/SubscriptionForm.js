import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    console.log(value)
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const SubscriptionForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.subscription?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="firstname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Firstname
        </Label>

        <TextField
          name="firstname"
          defaultValue={props.subscription?.firstname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="firstname" className="rw-field-error" />

        <Label
          name="lastname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Lastname
        </Label>

        <TextField
          name="lastname"
          defaultValue={props.subscription?.lastname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="lastname" className="rw-field-error" />

        <Label
          name="company"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Company
        </Label>

        <TextField
          name="company"
          defaultValue={props.subscription?.company}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="company" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.subscription?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.subscription?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>

        <TextField
          name="location"
          defaultValue={props.subscription?.location}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="location" className="rw-field-error" />

        <Label
          name="meals"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Meals
        </Label>

        <NumberField
          name="meals"
          defaultValue={props.subscription?.meals}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="meals" className="rw-field-error" />

        <Label
          name="service"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Service
        </Label>

        <TextField
          name="service"
          defaultValue={props.subscription?.service}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="service" className="rw-field-error" />

        <Label
          name="startedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Started at
        </Label>

        <DatetimeLocalField
          name="startedAt"
          defaultValue={formatDatetime(props.subscription?.startedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="startedAt" className="rw-field-error" />

        <Label
          name="customer"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer
        </Label>

        <TextField
          name="customer"
          defaultValue={props.subscription?.customer}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="customer" className="rw-field-error" />

        <Label
          name="card"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Card
        </Label>

        <TextField
          name="card"
          defaultValue={props.subscription?.card}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="card" className="rw-field-error" />

        <Label
          name="iban"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Iban
        </Label>

        <TextField
          name="iban"
          defaultValue={props.subscription?.iban}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="iban" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SubscriptionForm
