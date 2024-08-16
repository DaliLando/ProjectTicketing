import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { sendEvent } from '../API/eventApi';
import { useDispatch } from 'react-redux';
import { createEvent, setEvents } from '../app/eventSlice';

const NewEvent = ({ handleClose, show }) => {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    description:'',
    location: '',
    category: '',
    ticketsAvailable: [{ catType: '', quantity: '', price: '' }],
  });
   
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };
  const currentDate = new Date ();
  let minDate= currentDate.toISOString().slice(0,10)

  
  const handleTicketChange = (index, e) => {
    const tickets = [...event.ticketsAvailable];
    tickets[index][e.target.name] = e.target.value;
    setEvent({ ...event, ticketsAvailable: tickets });
  };

  const addTicket = () => {
    setEvent({
      ...event,
      ticketsAvailable: [...event.ticketsAvailable, { catType: '', quantity: '', price: '' }],
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(event);
    handleClose();
    sendEvent(event)
      .then((doc) => {
        console.log(doc);
        dispatch(createEvent(event))
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label style={{ color: 'white' }}>Event Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter event name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label style={{ color: 'white' }}>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                placeholder="Enter date"
                min={minDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridDescription">
            <Form.Label style={{ color: 'white' }}>Event Description</Form.Label>
            <Form.Control
              name="description"
              placeholder="Enter event description"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridLocation">
            <Form.Label style={{ color: 'white' }}>Location</Form.Label>
            <Form.Control
              name="location"
              placeholder="Enter event location"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCategory">
            <Form.Label style={{ color: 'white' }}>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="sport">Sport</option>
              <option value="entertainement">Entertainment</option>
            </Form.Control>
          </Form.Group>

          {event.ticketsAvailable.map((item, index) => (
            <Row key={index} className="mb-3">
              <Form.Group as={Col} controlId={`formGridCatType-${index}`}>
                <Form.Label style={{ color: 'white' }}>Ticket Category</Form.Label>
                <Form.Control
                  as="select"
                  name="catType"
                  value={item.catType}
                  onChange={(e) => handleTicketChange(index, e)}
                >
                  <option value="">Select...</option>
                  <option value="vip">VIP</option>
                  <option value="seats">Seats</option>
                  <option value="standing">Standing</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId={`formGridQuantity-${index}`}>
                <Form.Label style={{ color: 'white' }}>Quantity</Form.Label>
                <Form.Control
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleTicketChange(index, e)}
                  type="number"
                  placeholder="Enter quantity"
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formGridPrice-${index}`}>
                <Form.Label style={{ color: 'white' }}>Price</Form.Label>
                <Form.Control
                  name="price"
                  value={item.price}
                  onChange={(e) => handleTicketChange(index, e)}
                  type="number"
                  placeholder="Enter price"
                />
              </Form.Group>
            </Row>
          ))}

          {event.ticketsAvailable.length <3 && <Button variant="secondary" onClick={addTicket}>
            Add Ticket Category
          </Button>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEvent;
