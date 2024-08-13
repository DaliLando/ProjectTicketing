import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelTicket } from '../API/ticketAPI';
const PopUp = () => {
  const [show, setShow] = useState(false);
  const [isBooked , setBooked] = useState(false);


  const navigate = useNavigate();
  const {id} = useParams();
  const handleClose =()=>{
    setShow(false);
    navigate("/profile")
  }


  const wrapperClick = ()=> {
    cancelTicket(isBooked ,id)
    .then((doc)=>{
        console.log(doc) 
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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