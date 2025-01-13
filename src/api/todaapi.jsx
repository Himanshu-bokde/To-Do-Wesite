import useAxiosInstance from "./axiosInstance";

export const createTodoList = async (todoDetails) => {
  const axiosInstance = useAxiosInstance(); // Get the axios instance here

  try {
    const response = await axiosInstance.post("/todo/create", todoDetails);
  } catch (error) {}
};
