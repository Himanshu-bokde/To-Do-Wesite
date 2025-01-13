import React, { useState } from "react";
import Navbar from "../components/Navbar ";
import { createTodoList } from "../api/todaapi";
import "../styles/Todo.css";

const TodoPage = () => {
  const [todos, setTodos] = useState({
    task_name: "",
    discription: "",
    priority: "",
    date: "",
  });

  const handleAddTodo = async (e) => {
    e.preventDefault();
    createTodoList(todos);
  };

  return (
    <div className="todo-container">
      <Navbar />
      <div className="todo-content">
        <div className="todo-list">
          <h2>To-Do List</h2>
          {/* {todos.length > 0 ? (
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks yet</p>
          )} */}
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
              value={todos.priority} // Use 'todo' instead of 'todos'
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
              placeholder="Enter task..."
              value={todos.date}
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
