import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://54.227.46.179:5000/tasks";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title) return;

    await axios.post(API_URL, {
      title: title,
      status: "Pending",
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const completeTask = async (id, title) => {
    await axios.put(`${API_URL}/${id}`, {
      title: title,
      status: "Completed",
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager Application</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <h2>Task List</h2>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.title} - {task.status}

          <button
            onClick={() => completeTask(task.id, task.title)}
            style={{ marginLeft: "10px" }}
          >
            Complete
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
