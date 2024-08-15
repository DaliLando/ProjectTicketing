import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../API/eventApi'
import { Accordion, Alert,  Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';


const AdminStats = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events,setEvents]=useState([])

  console.log(events);
  
    useEffect(()=>{
        getAllEvents()
        .then((result)=>{
           setEvents(result)
            setLoading(false)

            
        })
        .catch((err)=>{
            console.log(err);
            setError(err)

        })
    },[])
    
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;






  return (
    
    <div>
      <div style={{textAlign:"center", color:"white",margin:"40px"}}>
        <h2>      Tickets Sold and Tickets remaining for all events
        </h2>
      </div>
      <br/>
      <Accordion defaultActiveKey="0">
        {events.map((item, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              <div style={{ width: "100%", textAlign: "center" }}>
                {item.name}
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush" style={{ textAlign: "center" }}>
                {item.nbrSold.map((el, indice) => (
                  <ListGroup.Item key={indice} style={{ backgroundColor: "#2c2c2c", color: "#ddd", border: "none", textAlign: "center" }}>
                    <h5 style={{ color: "#ffffff", marginBottom: "10px",textTransform: "uppercase" }}>{el.seatType}</h5>
                    <div>
                      Tickets Sold: <Badge bg="primary">{el.quantity}</Badge>
                      <br />
                      Tickets remaining: <Badge bg="success">{item.ticketsAvailable[indice].quantity}</Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
  </div>
  )
}

export default AdminStats