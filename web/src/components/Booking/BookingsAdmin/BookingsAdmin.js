import humanize from 'humanize-string'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Booking/BookingsCell'

const DELETE_BOOKING_MUTATION = gql`
  mutation DeleteBookingMutation($id: Int!) {
    deleteBooking(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const BookingsList = ({ bookings, callback }) => {
  const [deleteBooking] = useMutation(DELETE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast.success('Booking deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete booking ' + id + '?')) {
      deleteBooking({ variables: { id } })
    }
  }

  return (
    <table className="text-left w-full">
      <thead className="font-bold">
        <tr>
          <th>Date</th>
          <th>Créneau</th>
          <th>Usager</th>
          <th>Adresse</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-yellow-400 hover:cursor-pointer border-t-2" onClick={() => callback(booking)}>
              <td>{timeTag(booking.pickedAt)}</td>
              <td>{truncate(booking.timeslot)}</td>
              <td>{truncate(booking.firstname)} {truncate(booking.lastname.toUpperCase())}</td>
              <td>{locationTag(booking.location)}</td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookingsList
