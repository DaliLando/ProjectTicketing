import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createTicket } from '../API/ticketAPI';
import { toast } from 'react-toastify';


const BuyTicket = ({show, handleClose,id,event,setTicketCount}) => {
  const [value,setValue]= useState({
    valeur:"",
    valid:true
  })

  const handelChange =(e)=>{
     setValue({...value,[e.target.name]:e.target.value})
     
  }
  console.log(value);
  
 const handlePurchase = ()=> {
      createTicket(value, id)
      .then(()=>{
        toast.success("Ticket booked successfully")
      })
      .catch((err)=>{
        console.log(err);
        
      })

      setTicketCount((initialCount)=> initialCount+1)

      handleClose()
 }       


  return (
    <>
    

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please choose the type of seat you want to purchase
        <br/>
        <br/>
         {
         event.ticketsAvailable.map((item,index)=> {
           return <div key={index}>
              <input type='radio' name='valeur' value={item.catType} onChange={handelChange}/> {`${item.catType} (${item.price} TND)`}
           </div>
            
             
         })
         }
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePurchase}>
          Confirm purchase
        </Button>
      </Modal.Footer>
    </Modal>
  </>  );
}



export default BuyTicket