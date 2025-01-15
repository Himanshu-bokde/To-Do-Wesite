import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar ";
import { createTodoList, ListTodo } from "../api/todaapi";
import "../styles/Todo.css";

const TodoPage = () => {
  // Separate state for form data and task list
  const [todos, setTodos] = useState({
    task_name: "",
    discription: "",
    priority: "",
    date: "",
  });

  const [todosList, setTodosList] = useState([]); // State for the list of tasks

  // Handle form submission
  const handleAddTodo = async (e) => {
    e.preventDefault();
    createTodoList(todos)
      .then(() => {
        listTodo(); // Fetch updated task list after adding a new task
        setTodos({ task_name: "", discription: "", priority: "", date: "" }); // Reset form fields
      })
      .catch(() => {
        console.error("Error");
      });
  };

  // Fetch the task list from API
  const listTodo = async () => {
    ListTodo()
      .then((res) => {
        setTodosList(res.data); // Update task list without modifying the form data
      })
      .catch((err) => {
        console.errorr(err);
      });
  };

  // Fetch task list when component mounts
  useEffect(() => {
    listTodo();
  }, []);

  return (
    <div className="todo-container">
      <Navbar />
      <div className="todo-content">
        <div className="todo-list">
          <h2>To-Do List</h2>
          {todosList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {todosList.map((todo) => (
                  <tr key={todo._id}>
                    <td>{todo.taskName}</td>
                    <td>{todo.discription}</td>
                    <td>{todo.priority}</td>
                    <td>
                      {new Date(todo.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks yet</p>
          )}
        </div>

        {/* Right Side - To-do Form */}
        <div className="todo-form">
          <h2>Create Task</h2>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              required
              placeholder="Enter Task Name"
              value={todos.task_name}
              onChange={(e) =>
                setTodos({ ...todos, task_name: e.target.value })
              }
            />

            <textarea
              className="todo-textarea"
              placeholder="Enter Description"
              required
              value={todos.discription}
              onChange={(e) =>
                setTodos({ ...todos, discription: e.target.value })
              }
            ></textarea>

            <select
              required
              value={todos.priority}
              onChange={(e) => setTodos({ ...todos, priority: e.target.value })}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              required
              type="date"
              value={todos.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setTodos({ ...todos, date: e.target.value })}
            />

            <button>Add Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
