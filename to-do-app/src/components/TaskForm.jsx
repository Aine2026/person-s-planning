
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError("Please enter a task title.");
      return;
    }

    if (cleanTitle.length > 100) {
      setError("Task title must be 100 characters or less.");
      return;
    }

    onAdd(cleanTitle, priority);

    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        placeholder="What needs to be done?"
        maxLength={100}
        aria-label="Task title"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="Choose task priority"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">
        + Add Task
      </button>

      {error && (
        <p className="form-error">{error}</p>
      )}
    </form>
  );
}
