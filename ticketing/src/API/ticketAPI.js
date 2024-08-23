import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';

export const createTicket = async(values,id)=> {
let token = getLocalStorage("token")
let {data} = await axios.post(process.env.REACT_APP_URI+`/ticket/newticket/${id}`,values,{headers:{"Authorization":token}})
return data;
}

export const getTicket = async ()=> { 
    let token = getLocalStorage("token")
    let {data}= await axios.get(process.env.REACT_APP_URI+"/ticket/finduserticket",{headers:{"Authorization":token}})
return data;
}

export const cancelTicket= async (values ,id)=> {
    let token = getLocalStorage("token")
  
    
    let {data}=await axios.put(process.env.REACT_APP_URI+`/ticket/cancelticket/${id}`,values,{headers:{"Authorization":token}})
    return data
}

export const findTicket = async (id)=> { 
    let token = getLocalStorage("token")
    let {data}= await axios.get(process.env.REACT_APP_URI+`/ticket/findticket/${id}`,{headers:{"Authorization":token}})
return data;
}
