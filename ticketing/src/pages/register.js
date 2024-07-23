import React, { useState } from 'react'
import { signUp } from '../API/authAPI';

const Register = () => {

const [user,setUser]= useState({
    firstName:'',
    lastName:'',
    email:'',
    password:''
})
 const handleChange =(e)=> {
   setUser({...user,[e.target.name]:e.target.value})
 }
 const handleClick =(e)=> { 
   e.preventDefault();
    signUp(user)
    .then((doc)=> {
        console.log(doc);
    })
    .catch((err)=>{
        console.error(err);
    })
 }
  return (
    <div>
        <form>
            <input type='text' name='firstName' onChange={handleChange}/>
            <input type='text' name='lastName'onChange={handleChange}/>
            <input type='email' name='email'onChange={handleChange}/>
            <input type='password' name='password' onChange={handleChange}/>
            
        </form>
        <button onClick={(e)=>handleClick(e)}> Register </button>
    </div>
  )
}

export default Register