import React, { useEffect, useState } from "react";
import api from "../api/axios";
import CreateTaskForm from "../components/CreateTaskForm";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleCreated(task) {
    setTasks(prev => [task, ...prev]);
  }

  async function toggleComplete(task) {
    try {
      const res = await api.put(`/tasks/${task._id}`, { status: task.status === "pending" ? "completed" : "pending" });
      setTasks(prev => prev.map(t => (t._id === task._id ? res.data : t)));
    } catch {
      alert("Failed to update task");
    }
  }

  async function handleDelete(taskId) {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch {
      alert("Failed to delete task");
    }
  }

  return (
    <div>
      <h2 className="page-title">My Tasks</h2>
      <CreateTaskForm onCreated={handleCreated} />
      {loading ? <p>Loading...</p> : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-row">
              <div>
                <button className={`status-btn ${task.status === "completed" ? "done" : ""}`} onClick={() => toggleComplete(task)}>
                  {task.status === "completed" ? "✓" : "○"}
                </button>
              </div>
              <div className="task-main">
                <div className={`task-title ${task.status === "completed" ? "completed" : ""}`}>{task.title}</div>
                {task.description && <div className="task-desc">{task.description}</div>}
              </div>
              <div className="task-actions">
                <button onClick={() => navigator.clipboard.writeText(task._id)} className="small-btn">Copy ID</button>
                <button onClick={() => handleDelete(task._id)} className="small-btn danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}