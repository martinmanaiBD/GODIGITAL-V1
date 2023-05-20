// src/api/auth.ts
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  icNumber: string;
  preferredMediumOfCommunication: string;
  businessCategory: string;
  acceptanceToTermsAndConditions: boolean;
};

export type RegisterUserPayload = Omit<User, 'id'> & {
  password: string;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, {
      email,
      password,
    }, {
      withCredentials: true
    });

    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData: RegisterUserPayload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData: Partial<User>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const logoutUser = () => {
//   localStorage.removeItem('token');
// };

export const isSessionValid = async () => {
  try {
    await axios.get(`${API_BASE_URL}/api/session`, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${API_BASE_URL}/api/logout`, {}, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};


