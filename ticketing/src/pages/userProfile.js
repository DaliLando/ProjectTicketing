import React, { useEffect, useState } from 'react'
import { getTicket } from '../API/ticketAPI';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tickets,setTickets] = useState([]);
    
    console.log(tickets);
    const navigate = useNavigate();
    const handleShow = (id) =>{
        
        // console.log(id);
        navigate(`/cancel/${id}`)

         
    } 


    useEffect(()=>{
        getTicket()
        .then((doc)=> {
          setTickets(doc.tickets);
          
          setLoading(false)
        })
        .catch((err)=> {
          setError(err)
          
        })
      },[])

     
    if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
     {tickets.map((item,index)=> {
        let prix = item.event.ticketsAvailable.find((el)=>el.catType === item?.seatType)
      
        
        return <div style={{margin:"30px"}}>
        
        <Card key={index} style={{width:'300px',}}>
            <Card.Header>{item.event.name}</Card.Header>
        <Card.Body>
        
        
        <Card.Subtitle className="mb-2 text-muted"> Date : {item.event.date.split('').splice(0,10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Location : {item.event.location}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Date : {item.event.date.split('').splice(0,10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Seats :{item?.seatType} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Price :{prix?.price} </Card.Subtitle>

       
      </Card.Body>
      {item.isBooked ? <Card.Footer style={{display:"flex" , justifyContent:"space-around"}}>
        <Button variant="primary">Print</Button>
        <Button variant="danger" onClick={()=>handleShow(item._id)}>Cancel</Button>
      </Card.Footer> : <Card.Footer  style={{color:'red'}}>Ticket is canceled</Card.Footer> } 
      </Card>

      
      
      </div>

     })}
    
    </div>
  )
}

export default UserProfile