
const FILTERS = ["all", "pending", "completed"];

export default function FilterBar({
  filter,
  onChange,
  search,
  onSearch,
}) {
  return (
    <section className="filter-section">

      <div className="search-box">
        <span>⌕</span>

        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search your tasks..."
          aria-label="Search tasks"
        />
      </div>

      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={
              filter === item ? "active-filter" : ""
            }
            aria-pressed={filter === item}
            onClick={() => onChange(item)}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

    </section>
  );
}
