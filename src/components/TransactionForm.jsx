import { useState } from "react";
import { CATEGORIES } from "../utlis/constants";

const makeEmptyForm = () => ({
    title: "",
    amount: "",
    type: "expense",
    category: CATEGORIES.expense[0],
    date: new Date().toISOString().slice(0, 10),
});

export default function TransactionForm({
    onAdd,
    onUpdate,
    editingTransaction,
    onCancel,
}) {
    const [form, setForm] = useState(
        editingTransaction
            ? { ...editingTransaction, amount: String(editingTransaction.amount) }
            : makeEmptyForm()
    );
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            // type badalne par category bhi reset karo
            if (name === "type") next.category = CATEGORIES[value][0];
            return next;
        });
    };

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = "Title zaroori hai";
        if (!form.amount || Number(form.amount) <= 0)
            errs.amount = "Amount 0 se zyada hona chahiye";
        if (!form.date) errs.date = "Date chunein";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const data = {
            ...form,
            title: form.title.trim(),
            amount: Number(form.amount),
        };

        if (editingTransaction) {
            onUpdate(editingTransaction.id, data);
        } else {
            onAdd(data);
            setForm(makeEmptyForm());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div>
                <input
                    name="title"
                    placeholder="Title (e.g. Groceries)"
                    value={form.title}
                    onChange={handleChange}
                />
                {errors.title && <small className="error">{errors.title}</small>}
            </div>

            <div>
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                />
                {errors.amount && <small className="error">{errors.amount}</small>}
            </div>

            <select name="type" value={form.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES[form.type].map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <div>
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                />
                {errors.date && <small className="error">{errors.date}</small>}
            </div>

            <button type="submit">
                {editingTransaction ? "Update" : "Add Transaction"}
            </button>
            {editingTransaction && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}