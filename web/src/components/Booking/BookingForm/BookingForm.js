import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const BookingForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.booking?.id)
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
          name="pickedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Picked at
        </Label>

        <DatetimeLocalField
          name="pickedAt"
          defaultValue={formatDatetime(props.booking?.pickedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="pickedAt" className="rw-field-error" />

        <Label
          name="timeslot"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Timeslot
        </Label>

        <TextField
          name="timeslot"
          defaultValue={props.booking?.timeslot}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="timeslot" className="rw-field-error" />

        <Label
          name="user"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User
        </Label>

        <NumberField
          name="user"
          defaultValue={props.booking?.user}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="user" className="rw-field-error" />

        <Label
          name="subscription"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Subscription
        </Label>

        <NumberField
          name="subscription"
          defaultValue={props.booking?.subscription}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="subscription" className="rw-field-error" />

        <Label
          name="firstname"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Firstname
        </Label>

        <TextField
          name="firstname"
          defaultValue={props.booking?.firstname}
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
          defaultValue={props.booking?.lastname}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="lastname" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>

        <TextField
          name="email"
          defaultValue={props.booking?.email}
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
          defaultValue={props.booking?.phone}
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
          defaultValue={props.booking?.location}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="location" className="rw-field-error" />

        <Label
          name="details"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Details
        </Label>

        <TextField
          name="details"
          defaultValue={props.booking?.details}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="details" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.booking?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="status" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BookingForm
