import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Card, Spinner, Alert } from 'react-bootstrap';

const EventList = ({ category }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/event/category/${category}`);
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [category]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      {events.length === 0 ? (
        <Alert variant="info">No events found in this category.</Alert>
      ) : (
        events.map(event => (
          <Card key={event._id} style={{ marginBottom: '10px' }}>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>
                {event.date} - {event.location}
              </Card.Text>
              <Card.Text>{event.description}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventList;
