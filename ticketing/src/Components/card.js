import React, { useState } from 'react'
import { Button, Card,CloseButton } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteEvent } from '../API/eventApi'
import { getLocalStorage } from '../helpers/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { setEvents } from '../app/eventSlice'
import BuyTicket from './buyTicket'

const EventCard=({event}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const data = useSelector((state)=>state.Event.event);
    const location = useLocation()
    const dispatch = useDispatch()
    // console.log(location);
    const navigate = useNavigate();
  
    const token = getLocalStorage('token');
    const user = getLocalStorage('user');
    const handleClick =()=>{

      navigate(`/update/${event._id}`)
    }

    const buyTicket =()=>{
      handleShow()
     
      
      
    }

   
    const suppEvent =()=> {
    
      deleteEvent(event._id)
      .then((doc)=>{
        console.log(doc);
        dispatch(setEvents(data.filter((item)=>item._id !== event._id)))
      })
      .catch((err)=>{
        console.error(err);
      })
    }


    const cardForAdmin =()=>{
      return(
        <Card  style={{ margin: '20px',width:"300px" }} >
        <CloseButton style={{marginLeft:"270px"}} onClick={suppEvent}/>

            <Card.Body>
              
              <Card.Title>{event.name}</Card.Title>

              <Card.Text>
                Date : {event.date}  
              </Card.Text>
              <Card.Text>
              Location : {event.location}
              </Card.Text>
              {/* <Card.Text>
              Location : {event.ticketsAvailable.map((item)=>{
                return item
              })}
              </Card.Text> */}
              <Card.Text>{event.description}</Card.Text>
          <Button variant="success" onClick={handleClick}>edit</Button>
             

            </Card.Body>
          </Card>
      )
    }

    const cardForUser = ()=>{
      return(
        <Card  style={{ margin: '20px',width:"300px" }} >
  
            <Card.Body>
              
              <Card.Title>{event.name}</Card.Title>

              <Card.Text>
                Date : {event.date}  
              </Card.Text>
              <Card.Text>
              Location : {event.location}
              </Card.Text>
              {/* <Card.Text>
              Location : {event.ticketsAvailable.map((item)=>{
                return item
              })}
              </Card.Text> */}
              <Card.Text>{event.description}</Card.Text>
                <Button variant="success" onClick={buyTicket}>Buy Now</Button> 
             

            </Card.Body>
          </Card>
      )
    }
  return (
    <div>
       {token && user?.role === "user" ? cardForUser() : cardForAdmin()}
       {show && <BuyTicket handleClose={handleClose} show={show} id={event._id} event={event}/>}
    </div>
  )
}

export default EventCard