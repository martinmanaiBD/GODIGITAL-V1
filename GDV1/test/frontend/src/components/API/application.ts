import axios from 'axios';
import { API_BASE_URL } from '../../../config';

export type Application = {
  [x: string]: string | number | Date;
  id: number;
  userId: number;
  total: number;
  status: string;
};

export type ApplicationInput = {
  userId: number;
  total: number;
};

export const createApplication = async (
  data: ApplicationInput | FormData
): Promise<Application> => {
  const headers = !(data instanceof FormData)
    ? {
        "Content-Type": "application/json",
      }
    : undefined;

  // Convert plain object to FormData if necessary
  if (data instanceof Object && !(data instanceof FormData)) {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    data = formData;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/application`, data, {
      headers,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getApplicationsByUserId = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/application/user`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (id: number, status: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/applications/${id}`, { status }, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteApplication = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/applications/${id}`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw error;
  }
};
