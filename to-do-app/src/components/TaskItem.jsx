
import { useState } from "react";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  function handleSave(e) {
    e.preventDefault();

    const cleanTitle = title.trim();

    if (!cleanTitle) {
      alert("Task title cannot be empty.");
      return;
    }

    if (cleanTitle.length > 100) {
      alert("Task title must be 100 characters or less.");
      return;
    }

    onEdit(task.id, cleanTitle, priority);
    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(task.title);
    setPriority(task.priority);
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.done ? "done" : ""}`}>

      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            aria-label="Edit task title"
            autoFocus
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="Edit priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" className="save-btn">
            Save
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
            aria-label={`Complete ${task.title}`}
          />

          <div className="task-details">
            <span className="task-title">
              {task.title}
            </span>

            <span className={`priority ${task.priority}`}>
              {task.priority}
            </span>
          </div>

          <div className="task-actions">
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${task.title}`}
            >
              ✎
            </button>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              ×
            </button>
          </div>
        </>
      )}

    </li>
  );
}
