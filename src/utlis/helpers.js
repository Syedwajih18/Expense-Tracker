export const formatAmount = (n) => n.toLocaleString();

export const getTotals = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expense, balance: income - expense };
};

// Pie chart ke liye: [{ name: "Food", value: 1200 }, ...]
export const getExpenseByCategory = (transactions) => {
  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
  return Object.entries(totals).map(([name, value]) => ({ name, value }));
};

// Bar chart ke liye: [{ month: "2026-10", income: 5000, expense: 2000 }, ...]
export const getMonthlyData = (transactions) => {
  const months = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // "2026-10-25" -> "2026-10"
    if (!months[month]) months[month] = { month, income: 0, expense: 0 };
    months[month][t.type] += t.amount;
  });
  return Object.values(months).sort((a, b) => a.month.localeCompare(b.month));
};