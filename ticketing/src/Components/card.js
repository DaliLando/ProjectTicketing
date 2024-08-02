import React from 'react'
import { Button, Card,CloseButton } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteEvent } from '../API/eventApi'
import { getLocalStorage } from '../helpers/localStorage'

const EventCard=({event}) => {
    const location = useLocation()
    // console.log(location);
    const navigate = useNavigate();
  
    const token = getLocalStorage('token');
    const user = getLocalStorage('user');
    const handleClick =()=>{

      navigate(`/update/${event._id}`)
    }

   
    const suppEvent =()=> {
    
      deleteEvent(event._id)
      .then((doc)=>{
        console.log(doc);
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
              {location.pathname === "/admin" ? <Button variant="success" onClick={handleClick}>edit</Button> :  <Button variant="success">Buy Now</Button> }
             

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
                <Button variant="success">Buy Now</Button> 
             

            </Card.Body>
          </Card>
      )
    }
  return (
    <div>
       {token && user?.role === "user" ? cardForUser() : cardForAdmin()}
    </div>
  )
}

export default EventCard