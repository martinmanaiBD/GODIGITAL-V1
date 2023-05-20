// src/api/address.ts
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export type Address = {
  id?: number;
  userId: number;
  fullAddress: string;
  district: string;
  postcode: string;
  state: string;
};

export const createAddress = async (address: Address): Promise<Address> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/address`, address, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating address");
  }
};

export const updateAddress = async (address: Address): Promise<Address> => {
  if (!address.id) {
    throw new Error("Address ID not found");
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/address/${address.id}`,
      address,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating address");
  }
};

export const getAddress = async (userId: number): Promise<Address> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/address/${userId}`, {
      withCredentials: true,
    });
    return response.data.address;
  } catch (error) {
    throw new Error("Error fetching address");
  }
};
