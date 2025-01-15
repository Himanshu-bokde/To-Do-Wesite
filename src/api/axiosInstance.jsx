import axios from "axios";
import { toast } from "react-toastify";

const useAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:9990/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Attach Authorization Token
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle Expired Token Globally
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid - Handle logout
        toast.error("Session expired. Please log in again.");

        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("id");

        // Redirect user to login page
        window.location.href = "/"; // Direct page reload (fixes useNavigate issue)
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
