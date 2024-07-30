import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {category} = useParams()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/event/category/${category}`);
        setEvents(response.data.evenements);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [category]);
  console.log(events);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div style={{display:"flex", justifyContent:"space-evenly",flexWrap:"wrap"}}>
      {events.length === 0 ? (
        <Alert variant="info">No events found in this category.</Alert>
      ) : (
        events.map((item) => (
          <Card key={item._id} style={{ margin: '20px',width:"300px" }}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Date : {item.date}  
              </Card.Text>
              <Card.Text>
              Location : {item.location}
              </Card.Text>
              <Card.Text>{item.description}</Card.Text>
              <Button variant="success">Buy now</Button>{' '}

            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventList;
