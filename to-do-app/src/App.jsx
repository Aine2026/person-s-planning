
import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

const STORAGE_KEY = "my-todo-tasks";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (title, priority) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    setMessage("Task added successfully!");
  };

  // Edit an existing task
  const editTask = (id, title, priority) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, title, priority }
          : task
      )
    );

    setMessage("Task updated successfully!");
  };

  // Complete or uncomplete a task
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );

    setMessage("Task status updated!");
  };

  // Delete a task with confirmation
  const deleteTask = (id) => {
    const task = tasks.find((item) => item.id === id);

    if (!task) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmed) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    setMessage("Task deleted successfully!");
  };

  // Remove completed tasks
  const clearCompleted = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all completed tasks?"
    );

    if (!confirmed) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => !task.done)
    );

    setMessage("Completed tasks cleared!");
  };

  // Search and filter
  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "completed"
        ? task.done
        : filter === "pending"
        ? !task.done
        : true;

    return matchesSearch && matchesFilter;
  });

  const remaining = tasks.filter(
    (task) => !task.done
  ).length;

  const completed = tasks.filter(
    (task) => task.done
  ).length;

  return (
    <main className="app-container">
      <div className="todo-app">

        <header className="app-header">
          <div className="logo-icon">✓</div>

          <p className="subtitle">
            YOUR PERSONAL PLANNER
          </p>

          <h1>
            My Tasks<span>.</span>
          </h1>

          <p className="description">
            Organize your day and achieve your goals.
          </p>
        </header>

        <section className="task-stats">
          <div className="stat-card">
            <span className="stat-number">
              {tasks.length}
            </span>
            <span>Total Tasks</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {remaining}
            </span>
            <span>Pending</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {completed}
            </span>
            <span>Completed</span>
          </div>
        </section>

        <TaskForm onAdd={addTask} />

        {message && (
          <p className="feedback" role="status">
            {message}
            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </p>
        )}

        <FilterBar
          filter={filter}
          onChange={setFilter}
          search={search}
          onSearch={setSearch}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />

        <Footer
          remaining={remaining}
          onClearCompleted={clearCompleted}
        />

      </div>

      <p className="copyright">
        © 2026 My Tasks. Stay productive!
      </p>
    </main>
  );
}
