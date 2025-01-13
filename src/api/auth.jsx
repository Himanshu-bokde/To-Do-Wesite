import useAxiosInstance from "./axiosInstance";

/**
 * Logs in the user and stores session securely
 * @param {Object} credentials - { email, password }
 * @returns {Object} User data (name, id)
 */
export const loginUser = async (credentials) => {
  const axiosInstance = useAxiosInstance(); // Get the axios instance here

  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    console.log(response.data);
    // Store only necessary user details in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("id", response.data.id);

    return response.data;
  } catch (error) {
    console.error(
      "Login Error:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Login failed. Try again."
    );
  }
};

/**
 * Registers a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Object} User data (name, id)
 */
export const registerUser = async (userData) => {
  const axiosInstance = useAxiosInstance(); // Get the axios instance here

  try {
    const response = await axiosInstance.post("/auth/register", userData);

    const { name, id } = response.data;

    localStorage.setItem("name", name);
    localStorage.setItem("id", id);

    return { name, id };
  } catch (error) {
    console.error(
      "Registration Error:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Registration failed. Try again."
    );
  }
};
