import axios from 'axios';
import { API_BASE_URL } from '../../../config';


export type CartItem = {
    justification: string;
  };

// Add an justification to the cart
export const addJustificationCart = async (itemId: string | number, justification: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/${itemId}/justification`, { justification }, {
        withCredentials: true,
      });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJustificationCart = async (itemId: string | number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/${itemId}/justification`, {
      withCredentials: true,
    });

    // Assuming the server responds with a JSON object that has a 'justification' property
    return response.data.justification;
  } catch (error) {
    throw error;
  }
};
