import React, { useEffect } from 'react'
import { getAllEvents } from '../API/eventApi'

const AdminStats = () => {


    useEffect(()=>{
        getAllEvents()
        .then((result)=>{
            console.log(result);
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    },[])






  return (
    <div style={{color:"white"}}>adminStats</div>
  )
}

export default AdminStats