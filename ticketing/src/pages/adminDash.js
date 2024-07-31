import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../API/eventApi';
import { Alert, Spinner } from 'react-bootstrap';
import EventCard from '../Components/card';

const AdminDash = () => {

  const [events,setEvents]= useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getAllEvents()
    .then((doc)=> {
      setEvents(doc)
      setLoading(false)
    })
    .catch((err)=> {
      setError(err)
      
    })
  },[])

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
      {events.map((item,index)=>{
        return <EventCard event={item} key={index}/>
      })}
    </div>
  )
}

export default AdminDash