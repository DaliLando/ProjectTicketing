import React, { useEffect, useState,useRef } from 'react'
import { getTicket } from '../API/ticketAPI';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import { useReactToPrint } from 'react-to-print';

const UserTickets = () => {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tickets,setTickets] = useState([]);
    


    const navigate = useNavigate();
    const handleShow = (id) =>{
        
        // console.log(id);
        navigate(`/cancel/${id}`)

         
    } 
  

    const compRef = useRef()
    const handlePrint = useReactToPrint({
      content:()=>compRef.current
    })

    useEffect(()=>{
        getTicket()
        .then((doc)=> {
          setTickets(doc.tickets);
          
          setLoading(false)
        })
        .catch((err)=> {
          console.log(err);
          
          setError(err.response.data.msg)
          setLoading(false)
        })
      },[])

     
    if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    
    <div>
     <h1 style={{textAlign:"center", marginTop:"30px"}}> Tickets Bought : </h1>
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}}>
      
      {
        
     tickets.map((item,index)=> {
        let prix = item.event.ticketsAvailable.find((el)=>el.catType === item?.seatType)
         let qrValue ={
          ID: item._id ,
          user : item.user.email,
          event: item.event.name,
          seat : item?.seatType,
          date:item.event.date,
          location:item.event.location
         }
        
        return <div style={{margin:"30px"}}>
          
        
        <Card key={index} style={{width:'300px'}} >
          <div ref={compRef} >
            <Card.Header style={{textAlign:"center"}}>{item.event.name}</Card.Header>
            <div style={{ background: 'white', padding: '16px',textAlign:"center" }}>
  <QRCode value={JSON.stringify(qrValue)}/>
</div>
        <Card.Body style={{textAlign:'center'}}>
        
        
        <Card.Subtitle className="mb-2 text-muted"> Date : {item.event.date.split('').splice(0,10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Location : {item.event.location}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Date : {item.event.date.split('').splice(0,10)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Seats : {item?.seatType} </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> Price : {prix?.price} Dt</Card.Subtitle>

       
      </Card.Body>
      </div>
      {item.isBooked ? <Card.Footer style={{display:"flex" , justifyContent:"space-around"}}>
        <Button variant="primary" onClick={()=>handlePrint()}>Print</Button>
        <Button variant="danger" onClick={()=>handleShow(item._id)}>Cancel</Button>
      </Card.Footer> : <Card.Footer  style={{color:'red'}}>Ticket is canceled</Card.Footer> } 
      </Card>

      
      
      </div>

     })}
    
    </div>
    </div>
  )
}

export default UserTickets
