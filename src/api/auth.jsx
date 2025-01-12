import axios from "axios";

const API_URL = "http://localhost:9990/api/auth";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("name", response.data.name);
  localStorage.setItem("id", response.data.id);
  return response.data.name;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("name", response.data.name);
  localStorage.setItem("id", response.data.id);
  return response.data.name;
};
