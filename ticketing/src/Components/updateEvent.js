import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const UpdateEvent = () => {
    const [event, setEvent] = useState({
        date: '',
        location: '',
        ticketsAvailable: [{ catType: '', quantity: '', price: '' }],
        
      });
      const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
      };

      let {id} = useParams()
      console.log(id);
  return (
    <div>


    </div>
  )
}

export default UpdateEvent