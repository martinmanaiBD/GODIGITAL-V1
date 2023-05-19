import axios from "axios";
import { API_BASE_URL } from "../../../config";

export type Product = {
  id?: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: File | null;
};

// Add Product
export const addProduct = async (
  data: Product | FormData
): Promise<Product> => {
  const headers = !(data instanceof FormData)
    ? {
        "Content-Type": "application/json",
      }
    : undefined;

  try {
    const response = await axios.post(`${API_BASE_URL}/product`, data, {
      withCredentials: true,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error adding product");
  }
};

// Update Product
export const updateProduct = async (
  data: Product | FormData
): Promise<Product> => {
  const productId = data instanceof FormData ? data.get("id") : data.id;
  if (!productId) {
    throw new Error("Product ID not found");
  }

  const headers = !(data instanceof FormData)
    ? {
        "Content-Type": "application/json",
      }
    : undefined;

  try {
    const response = await axios.put(
      `${API_BASE_URL}/product/${productId}`,
      data,
      {
        withCredentials: true,
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating product");
  }
};

// Get Product by ID
export const getProduct = async (
  productId: number
): Promise<Product> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product");
  }
};

// Get All Products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching all products");
  }
};

// Delete Product
export const deleteProduct = async (
  productId: number
): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/product/${productId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Error deleting product");
  }
};