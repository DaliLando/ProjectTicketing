import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../API/eventAPI';
import { Card, Col, Row } from 'react-bootstrap';

const EventList = ({ category }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((data) => {
      const filteredEvents = data.filter(event => event.category === category);
      setEvents(filteredEvents);
    });
  }, [category]);

  return (
    <Row>
      {events.map(event => (
        <Col key={event._id} md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>{event.date}</Card.Text>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default EventList;
