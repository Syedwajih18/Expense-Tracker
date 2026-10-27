import { getTotals, formatAmount } from "../utlis/helpers";

export default function Summary({ transactions }) {
  const { income, expense, balance } = getTotals(transactions);

  return (
    <div className="summary">
      <div className="card income">
        <small>Total Income</small>
        <h2>{formatAmount(income)}</h2>
      </div>
      <div className="card expense">
        <small>Total Expense</small>
        <h2>{formatAmount(expense)}</h2>
      </div>
      <div className="card balance">
        <small>Balance</small>
        <h2>{formatAmount(balance)}</h2>
      </div>
    </div>
  );
}