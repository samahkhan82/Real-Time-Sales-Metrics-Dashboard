import axios from "axios";

const API_URL = "http://localhost:5000";

export const addSale = async (amount, product) => {
  const response = await axios.post(`${API_URL}/add-sale`, { amount, product });
  return response.data;
};

export const fetchSales = async () => {
  try {
    const response = await axios.get(`${API_URL}/sales`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return [];
  }
};
