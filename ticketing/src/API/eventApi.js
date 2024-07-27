import axios from 'axios';

const API_URL = 'http://localhost:3000/event/getevents'; // Update this to your API endpoint

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
