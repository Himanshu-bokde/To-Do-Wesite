import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};
