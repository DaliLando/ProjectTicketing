import React, { useState } from "react";
import { signIn } from "../API/authAPI";

const Login = () => { 

const [user,setUser] = useState({
        email:'',
        password:''
    })

const handleChange =(e)=> { 
    setUser({...user,[e.target.name]:e.target.value})
}
const handleClick =(e)=> { 
    e.preventDefault();
     signIn(user)
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
            <input type="email" name="email" onChange={handleChange}/>
            <input type="password" name="password" onChange={handleChange}/>
        </form>
        <button onClick={(e)=>handleClick(e)}>Login </button>
    </div>
  )
}

export default Login