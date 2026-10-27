import { useState, useMemo, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import FilterBar from "./components/FilterBar";
import Charts from "./components/Charts";
const DEFAULT_FILTERS = { search: "", type: "all", category: "all", month: "" };

const getInitialTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      { id: crypto.randomUUID(), ...transaction },
      ...prev,
    ]);
  };

  const updateTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated, id } : t))
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingTransaction?.id === id) setEditingTransaction(null);
  };

  // Derived data: filters badalne par hi dobara calculate hota hai
  const filteredTransactions = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(query);
      const matchesType = filters.type === "all" || t.type === filters.type;
      const matchesCategory =
        filters.category === "all" || t.category === filters.category;
      const matchesMonth = !filters.month || t.date.startsWith(filters.month);
      return matchesSearch && matchesType && matchesCategory && matchesMonth;
    });
  }, [transactions, filters]);

  const [theme, setTheme] = useLocalStorage("theme", getInitialTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <Summary transactions={filteredTransactions} />

      <TransactionForm
        key={editingTransaction?.id ?? "new"}
        onAdd={addTransaction}
        onUpdate={updateTransaction}
        editingTransaction={editingTransaction}
        onCancel={() => setEditingTransaction(null)}
      />

      <Charts transactions={filteredTransactions} />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />

      {transactions.length > 0 && filteredTransactions.length === 0 ? (
        <p className="empty">Filters se koi transaction match nahi hua.</p>
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
        />
      )}
    </div>
  );
}

export default App;