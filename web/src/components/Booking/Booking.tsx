import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const Booking = (props) => {
  const [startDate, setStartDate] = useState(new Date())
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
        <div>
          <Form>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
}

export default Booking
