import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar ";
import { createTodoList, ListTodo, deleteTodo,updatetask } from "../api/todaapi";
import { toast } from "react-toastify";
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
  const [addModalOpen, setaddModalOpen] = useState(false); 
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [selectedTodo, setSelectedTodo] = useState(null); // Stores selected task for editing


  // Handle form submission
  const handleAddTodo = async (e) => {
    e.preventDefault();
    createTodoList(todos)
      .then(() => {
        listTodo(); // Fetch updated task list after adding a new task
        setTodos({ task_name: "", discription: "", priority: "", date: "" }); // Reset form fields
        toast.success("Task is Created")
        closeAddModel()
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

  const deletetododata = (todo) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTodo(todo._id).then((res)=>{
        toast.success("Task is Delete")
        listTodo();
      }).catch((err)=>{
        console.errorr(err);
      });
    
    };
    }

     // Open Edit Modal
  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setEditModalOpen(true);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedTodo(null);
  };

  // Handle task update
  const editTask = () => {
    updatetask(selectedTodo).then(()=>{
      toast.success("Task Updated Successfully");
      listTodo();
    }).catch((err)=>{
      console.error(err);
    }) 
    closeEditModal();
  };


  const addTodo=()=>{
    setaddModalOpen(true)
  }

  const closeAddModel=()=>{
    setaddModalOpen(false)
  }


   

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
                      <button onClick={() => openEditModal(todo)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => deletetododata(todo)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No tasks yet</p>
          )}
          <button onClick={addTodo}>Add Task</button>
        </div>
        </div>
        {/* Right Side - To-do Form */}
        {addModalOpen  && (
        <div className="todo-form">
            <div className="modal">
            <div className="modal-content">
          <h2>Create Task</h2>
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              required
              placeholder="Enter Task Name"
              value={todos.task_name}
              onChange={(e) => setTodos({ ...todos, task_name: e.target.value })}
            />

            <textarea
              className="todo-textarea"
              placeholder="Enter Description"
              required
              value={todos.discription}
              onChange={(e) => setTodos({ ...todos, discription: e.target.value })}
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
            <button onClick={closeAddModel}>Close</button>
          </form>
          </div>
          </div>
        </div>
        )}

  

      {/* Edit Task Modal */}
      {editModalOpen && selectedTodo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={selectedTodo.taskName}
              onChange={(e) => setSelectedTodo({ ...selectedTodo, taskName: e.target.value })}
            />
            <textarea
              value={selectedTodo.discription}
              onChange={(e) => setSelectedTodo({ ...selectedTodo, discription: e.target.value })}
            />
            <select
              value={selectedTodo.priority}
              onChange={(e) => setSelectedTodo({ ...selectedTodo, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={selectedTodo.date.split("T")[0]}
              onChange={(e) => setSelectedTodo({ ...selectedTodo, date: e.target.value })}
            />
            <button onClick={editTask}>Save Changes</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );

};

export default TodoPage;
