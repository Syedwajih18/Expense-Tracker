import { CATEGORIES } from "../utlis/constants";

const ALL_CATEGORIES = [
  ...new Set([...CATEGORIES.expense, ...CATEGORIES.income]),
];

export default function FilterBar({ filters, onChange, onReset }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <input
        name="search"
        placeholder="Search by title..."
        value={filters.search}
        onChange={handleChange}
      />

      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="all">All Categories</option>
        {ALL_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        name="month"
        type="month"
        value={filters.month}
        onChange={handleChange}
      />

      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}