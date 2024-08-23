import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EventCard from './card';
import {useDispatch, useSelector} from "react-redux";
import { setEvents } from '../app/eventSlice';
const EventList = () => {
  // const [events, setEvents] = useState([]);
  const {event} = useSelector((state)=>state.Event)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const {category} = useParams()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URI+`/event/category/${category}`);
        
        dispatch(setEvents(response.data.evenements))
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchEvents();
  }, [category]);

 
  console.log(event);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div style={{display:"flex", justifyContent:"space-evenly",flexWrap:"wrap"}}>
      {event.length === 0 ? (
        <Alert variant="info">No events found in this category.</Alert>
      ) : (
        event.map((item,index) => {
          return <EventCard event={item} key={index}/>

        }
        )
      )}
    </div>
  );
};

export default EventList;
