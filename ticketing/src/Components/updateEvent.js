import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { editEvent, findEvent } from '../API/eventApi';

const UpdateEvent = () => {
  const [event, setEvent] = useState({
    date: '',
    location: '',
    ticketsAvailable: [{ catType: '', quantity: '', price: '' }],
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const currentDate = new Date();
  let minDate = currentDate.toISOString().slice(0, 10);
  let { id } = useParams();

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    findEvent(id)
      .then((result) => {
        const eventData = result.doc;
        setEvent({
          date: eventData.date.slice(0, 10),
          location: eventData.location,
          ticketsAvailable: eventData.ticketsAvailable.length
            ? eventData.ticketsAvailable
            : [{ catType: '', quantity: '', price: '' }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleClose = () => {
    setShow(false);
    navigate('/admin');
  };

  const handleClick = (e) => {
    e.preventDefault();
    editEvent(event, id)
      .then((doc) => {
        console.log(doc);
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTicketChange = (index, e) => {
    const tickets = [...event.ticketsAvailable];
    tickets[index][e.target.name] = e.target.value;
    setEvent({ ...event, ticketsAvailable: tickets });
  };

  const addTicket = () => {
    setEvent({
      ...event,
      ticketsAvailable: [
        ...event.ticketsAvailable,
        { catType: '', quantity: '', price: '' },
      ],
    });
  };

  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Update an existing event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label style={{ color: 'white' }}>Date</Form.Label>
                <Form.Control
                  name="date"
                  type="date"
                  placeholder="Enter date"
                  min={minDate}
                  onChange={handleChange}
                  value={event.date}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridLocation">
              <Form.Label style={{ color: 'white' }}>Location</Form.Label>
              <Form.Control
                name="location"
                placeholder="Enter event location"
                onChange={handleChange}
                value={event.location}
              />
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

            {event.ticketsAvailable.length < 3 && (
              <Button variant="secondary" onClick={addTicket}>
                Add Ticket Category
              </Button>
            )}
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
    </div>
  );
};

export default UpdateEvent;
