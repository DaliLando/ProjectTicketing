import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

function EventCard({event}) {
    const location = useLocation()
    // console.log(location);
    const navigate = useNavigate();

    const handleClick =()=>{

      navigate(`/update/${event._id}`)
    }
  return (
    <div>
        <Card  style={{ margin: '20px',width:"300px" }}>
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
    </div>
  )
}

export default EventCard