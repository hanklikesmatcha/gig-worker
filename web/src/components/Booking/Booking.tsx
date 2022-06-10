import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form, DatetimeLocalField, FieldError, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointmentMutation($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      location
      status
      talentId
      time
    }
  }
`

const Booking = (props) => {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Appointment made')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const currentTime = dayjs(new Date(), 'YYYY-MM-DDTHH:mm').format(
    'YYYY-MM-DDTHH:mm'
  )

  const [selectedTime, setSelectedTime] = useState(currentTime)
  const onSubmit = (data) => {
    setSelectedTime(data)

    if (confirm(`Book?`)) {
      createAppointment({
        variables: {
          input: {
            talentId: props.talent,
            location: 'N/A',
            status: 'new',
            time: dayjs(selectedTime, 'YYYY-MM-DDTHH:mm:ssZ[Z]'),
          },
        },
      })
    }
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      animation={true}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <DatetimeLocalField
            className="flex-block w-max"
            name="booking-time"
            min={currentTime}
            step="1800"
            errorClassName="input error"
          />
          <FieldError name="booking-time" className="error-message" />
          <Submit className="button">Save</Submit>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Booking
