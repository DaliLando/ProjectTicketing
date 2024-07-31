import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';

const API_URL = 'http://localhost:7000'; // Update this to your API endpoint

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL+"/category/:category");
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getAllEvents = async ()=> {
  let token = getLocalStorage("token")
  let {data} = await axios.get(API_URL+"/event/getevents",{headers:{
    "Authorization":token
  }})

  return data;
}
