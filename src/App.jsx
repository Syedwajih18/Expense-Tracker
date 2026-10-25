import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useLocalStorage("transactions", []);
  const [editingTransaction, setEditingTransaction] = useState(null);

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

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <TransactionForm
        key={editingTransaction?.id ?? "new"}
        onAdd={addTransaction}
        onUpdate={updateTransaction}
        editingTransaction={editingTransaction}
        onCancel={() => setEditingTransaction(null)}
      />
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={setEditingTransaction}
      />
    </div>
  );
}

export default App;