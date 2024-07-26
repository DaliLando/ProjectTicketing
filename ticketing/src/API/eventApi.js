import axios from 'axios';

const API_URL = 'YOUR_API_ENDPOINT/events'; // Replace with your API endpoint

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};