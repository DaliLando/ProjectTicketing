import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../API/eventApi';
import { Alert, Button, Spinner } from 'react-bootstrap';
import EventCard from '../Components/card';
import NewEvent from '../Components/newEvent';

const AdminDash = () => {

  const [events,setEvents]= useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);


  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    <div>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
      {events.map((item,index)=>{
        return <EventCard event={item} key={index}/>
      })}
    </div>
      <Button variant="primary" onClick={handleShow}>
        Create New Event
      </Button>  

      {show && <NewEvent show={show} handleClose={handleClose}/>}
    </div>
  )
}

export default AdminDash