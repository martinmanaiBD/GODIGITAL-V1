import axios from "axios";
import { API_BASE_URL } from "../../../config";

export type Business = {
  id?: number;
  userId: number;
  companyName: string;
  businessAddress: string;
  averageRevenue: string;
  businessNature: string;
  registrationNumber: string;
  franchiseStatus: string;
  franchiseNumber: string;
  documentPath?: string;
};

export const createBusiness = async (
  data: Business | FormData
): Promise<Business> => {
  const headers = !(data instanceof FormData)
    ? {
        "Content-Type": "application/json",
      }
    : undefined;

  try {
    const response = await axios.post(`${API_BASE_URL}/business`, data, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating business");
  }
};

export const updateBusiness = async (
  data: Business | FormData
): Promise<Business> => {
  const businessId = data instanceof FormData ? data.get("id") : data.id;
  if (!businessId) {
    throw new Error("Business ID not found");
  }

  const headers = !(data instanceof FormData)
    ? {
        "Content-Type": "application/json",
      }
    : undefined;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/business/${businessId}`,
      data,
      {
        withCredentials: true,
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating business");
  }
};

export type GetBusinessResponse = {
  message: string;
  business: Business;
};

export const getBusiness = async (
  userId: number
): Promise<GetBusinessResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/business/${userId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching business");
  }
};
