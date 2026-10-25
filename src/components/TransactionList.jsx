export default function TransactionList({ transactions, onDelete, onEdit }) {
    if (transactions.length === 0) {
        return <p className="empty">You currently dont have any transactions. please add</p>;
    }

    return (
        <ul className="transaction-list">
            {transactions.map((t) => (
                <li key={t.id} className={`item ${t.type}`}>
                    <div>
                        <strong>{t.title}</strong>
                        <small>
                            {t.category} • {t.date}
                        </small>
                    </div>
                    <span>
                        {t.type === "expense" ? "-" : "+"}
                        {t.amount.toLocaleString()}
                    </span>
                    <button onClick={() => onEdit(t)} aria-label="Edit">
                        ✎
                    </button>
                    <button onClick={() => onDelete(t.id)} aria-label="Delete">
                        ✕
                    </button>
                </li>
            ))}
        </ul>
    );
}