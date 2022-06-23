import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form, DatetimeLocalField, FieldError, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useAuth } from '@redwoodjs/auth'

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
  const { client: supabase } = useAuth()
  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Appointment Made 🎉')
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
            talentId: props.talent.id,
            location: 'N/A',
            status: 'new',
            time: dayjs(selectedTime, 'YYYY-MM-DDTHH:mm:ssZ[Z]'),
            attendees: [props.talent.email, supabase.auth.user().email],
          },
        },
      })
      toast('Appointment Made! 🎉 ')
    }
  }
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      size="sm"
      animation={true}
      centered
    >
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <div className="grid grid-col-2 grid-flow-row gap-5 place-content-center h-screen">
            <DatetimeLocalField
              name="booking-time"
              min={currentTime}
              errorClassName="input error"
            />
            <div className="grid grid-col-2 grid-flow-col gap-10">
              <FieldError name="booking-time" className="error-message" />
              <Submit className="w-25">Book🔨</Submit>
              <Button className="w-25" onClick={props.onHide}>
                Cancel😫
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Booking
