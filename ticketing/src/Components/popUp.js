import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelTicket, findTicket } from '../API/ticketAPI';
const PopUp = () => {
  const [show, setShow] = useState(false);
  const [isBooked , setBooked] = useState(false);


  const navigate = useNavigate();
  const {id} = useParams();
  const handleClose =()=>{
    setShow(false);
    navigate("/tickets")
  }

const [valeur,setValeur]= useState("")

  useEffect(()=>{
    findTicket(id)
    .then((doc)=> {
setValeur(doc.seatType);
    })
    .catch((err)=> {
      console.log(err);
            
    })
  },[])


  const wrapperClick = ()=> {
    cancelTicket({isBooked :isBooked ,valeur : valeur} ,id)
    .then((doc)=>{
        handleClose ()  
    })
    .catch((err)=>{
        console.error(err) 
    })
    // console.log(id);
    
  }

  return (
    <div>
        <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Ticket Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure want to cancel this ticket ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>wrapperClick()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> 
    </div>
  )
}

export default PopUp
