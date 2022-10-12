import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { Form, SelectField, Submit } from '@redwoodjs/forms'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPaymentMutation($input: CreatePaymentInput!) {
    payment: createPayment(input: $input) {
      id
    }
  }
`

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  const day = new Date(datetime)
  return (
    day && (day.getDate() + '/' + (day.getMonth()+1) + '/' + day.getFullYear())
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const locationTag = (location) => {
  const address = location.split(",")
  return (
    address[0] + address[1]
  )
}

const BookingAdmin = ( props ) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Demande supprimée')
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    props.onSave(data, props?.booking?.id)
  }

  const onDeleteClick = (id) => {
    if (confirm('Confirmez la suppression de la demande #' + id + ' ?')) {
      deleteBooking({ variables: { id } })
    }
  }

  const [payBooking] = useMutation(CREATE_PAYMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Demande facturée')
      //window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onPayClick = async (id) => {
    if (confirm('Confirmez la facturation de la demande #' + id + ' ?')) {
      console.log("Lancement du paiement:", id)
      /* Get customer secret */
      var payment = await payBooking({ variables: {
        input: {
            customer: 'cus_MaSYzxnklLaFH7',
            amount: 4,
            payment_method: 'pm_1LrHdKDczmPm9BYQMMkuAWs4',
            receipt: 'do.huynh@les-detritivores.co',
          }
        }
      })
      console.log('Payment:', JSON.stringify(payment.data.payment.id))
      props.onSave(
        {
          status: "Terminé", 
          payment: payment.data.payment.id
        }, 
        props?.booking?.id)
    }
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit}>
        <div className="rw-segment">
          <table className="rw-table">
            <tbody>
              <tr>
                <th>Date</th>
                <td>{timeTag(props.booking?.pickedAt)}</td>
              </tr>
              <tr>
                <th>Créneau</th>
                <td>{props.booking?.timeslot}</td>
              </tr>
              <tr>
                <th>Usager</th>
                <td>{props.booking?.firstname} {props.booking?.lastname.toUpperCase()}</td>
              </tr>
              <tr>
                <th>Mél</th>
                <td>{props.booking?.email}</td>
              </tr>
              <tr>
                <th>Tél</th>
                <td>{props.booking?.phone}</td>
              </tr>
              <tr>
                <th>Adresse</th>
                <td>{locationTag(props.booking?.location)}</td>
              </tr>
              <tr>
                <th>Détails</th>
                <td>{props.booking?.details}</td>
              </tr>
              <tr>
                <th>Payé</th>
                <td>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-auto">
                      {props.booking?.payment ? 'Oui' : 'Non'}
                    </div>
                    <div className="my-auto">
                      {(!props.booking?.payment && (props.booking?.status === "A payer")) &&
                        <button className="rw-button rw-button-green" onClick={(e) => {e.preventDefault(); onPayClick(props.booking?.id)}}>
                          Payer
                        </button>
                      }
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Statut</th>
                <td>
                  <SelectField name="status">
                    <option value="A collecter" selected={props.booking?.status === "A collecter" ? 'selected' : ''}>A collecter</option>
                    <option value="A payer" selected={props.booking?.status === "A payer" ? 'selected' : ''}>A payer</option>
                    <option value="Terminé" selected={props.booking?.status === "Terminé" ? 'selected' : ''}>Terminé</option>
                    <option value="Annulé" selected={props.booking?.status === "Annulé" ? 'selected' : ''}>Annulé</option>
                  </SelectField>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rw-button-group">
          <Submit disabled={props?.loading} className="rw-button rw-button-blue">
            Enregistrer
          </Submit>
          <button
            type="button"
            className="rw-button rw-button-red"
            onClick={() => onDeleteClick(props.booking?.id)}
          >
            Supprimer
          </button>
          <button
            type="button"
            className="rw-button rw-button-gray"
            onClick={props.onCancel}
          >
            Fermer
          </button>
        </div>
      </Form>
    </div>
  )
}

export default BookingAdmin
