import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const CategoryEvents = () => {
  const { category } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/event/categories/${category}`);
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h1>{category} Events</h1>
      {events.length === 0 ? (
        <Alert variant="info">No events found in this category.</Alert>
      ) : (
        <Row>
          {events.map(event => (
            <Col key={event._id} md={4}>
              <div className="event-card">
                <h2>{event.title}</h2>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoryEvents;