import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/productos`);
  return response.data;
};

export const getSpecialPrices = async (userId: string) => {
  const response = await axios.get(`${API_URL}/precios-especiales`, {
    params: { userId },
  });
  return response.data;
};

export const getUserSpecialPrice = async () => {
  const response = await axios.get(`${API_URL}/precios-especiales/usuarios`);
  return response.data;
};

export const addSpecialPrice = async (data: {
  userId: string;
  productId: string;
  specialPrice: number;
}) => {
  const response = await axios.post(`${API_URL}/precios-especiales`, data);
  return response.data;
};

export const updateSpecialPrice = async (id: string, specialPrice: number) => {
  const response = await axios.put(`${API_URL}/precios-especiales/${id}`, {
    specialPrice,
  });
  return response.data;
};

export const deleteSpecialPrice = async (id: string) => {
  const response = await axios.delete(`${API_URL}/precios-especiales/${id}`);
  return response.data;
};
