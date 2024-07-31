import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EventCard from './card';

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
        events.map((item,index) => {
          return <EventCard event={item} key={index}/>

        }
        )
      )}
    </div>
  );
};

export default EventList;
