import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Both fields are required!");
      return;
    }
    const newTask = { title, description };
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", textAlign:"left"}}>
      <h3>To-Do Application</h3>
      <form onSubmit={addTask}>
        <div>
          <textarea
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          />
        </div>
        <div>
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Task
        </button>
      </form>
      <hr />
      <h2>Tasks List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "15px" }}>
            <h3 style={{ margin: 0 }}>{task.title}</h3>
            <p style={{ margin: "5px 0" }}>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
