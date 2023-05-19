import axios from 'axios';
import { API_BASE_URL } from '../../../config';

// Types for the cart items
export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number; 
  imgUrl?: string;
  justification: string;
};

// Add an item to the cart
export const addToCart = async (item: Omit<CartItem, 'id'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart`, item, {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };;

// Update an item in the cart
export const updateCartItem = async (itemId: string | number, updatedItem: Partial<CartItem>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/${itemId}`, updatedItem, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = async (itemId: string | number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch the cart items
export const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


