import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';


export const fetchEvents = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URI+"/category/:category");
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getAllEvents = async ()=> {
  let token = getLocalStorage("token")
  let {data} = await axios.get(process.env.REACT_APP_URI+"/event/getevents",{headers:{
    "Authorization":token
  }})

  return data;
}

export const sendEvent = async (values)=> {
  let token = getLocalStorage("token")
  let {data}= await axios.post(process.env.REACT_APP_URI+"/event/newevent",values,{headers:{"Authorization":token}})
     return data
}

export const editEvent = async (values,id)=> {
 let token = getLocalStorage("token")
 let {data}= await axios.put(process.env.REACT_APP_URI+ `/update/${id}`,values,{headers:{"Authorization":token}})
 return data
}
