import useAxiosInstance from "./axiosInstance";

export const createTodoList = async (todoDetails) => {
  const axiosInstance = useAxiosInstance();

  try {
    const id = localStorage.getItem("id");
    todoDetails.userId = id;
    const response = await axiosInstance.post("/todo/create", todoDetails);
  } catch (error) {}
};

export const ListTodo = async () => {
  const axiosInstance = useAxiosInstance();

  try {
    const userId = localStorage.getItem("id");
    const response = await axiosInstance.get(`/todo/list?userId=${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
