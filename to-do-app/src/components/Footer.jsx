
export default function Footer({
  remaining,
  onClearCompleted,
}) {
  return (
    <footer className="todo-footer">

      <p>
        <strong>{remaining}</strong>{" "}
        {remaining === 1 ? "task" : "tasks"} remaining
      </p>

      <button
        type="button"
        onClick={onClearCompleted}
      >
        Clear Completed
      </button>

    </footer>
  );
}
