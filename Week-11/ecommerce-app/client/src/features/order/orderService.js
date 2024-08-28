// orderService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // Adjust the API URL as necessary

const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

const getOrder = async (orderId) => {
  const response = await axios.get(`${API_URL}/orders/${orderId}`);
  return response.data;
};

const updateOrder = async (orderId, orderData) => {
  const response = await axios.put(`${API_URL}/orders/${orderId}`, orderData);
  return response.data;
};

const deleteOrder = async (orderId) => {
  const response = await axios.delete(`${API_URL}/orders/${orderId}`);
  return response.data;
};
const fetchOrders = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/orders/user/${userId}`
  );
  return response.data;
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  fetchOrders,
};

export default orderService;
