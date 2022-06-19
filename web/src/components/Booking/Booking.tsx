import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Form, DatetimeLocalField, FieldError, Submit } from '@redwoodjs/forms'
import { useState } from 'react'
import { format, formatISO } from 'date-fns'

const Booking = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const onSubmit = (data) => {
    console.log(data)
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
            value={formatISO(startDate).toString().substring(0, 19)}
            min={formatISO(startDate).toString().substring(0, 19)}
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
