import { useState } from 'react'
import { CATEGORIES, CATEGORY_STYLE } from './constants'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [pendingDelete, setPendingDelete] = useState(null);

  let filtered = transactions;
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2 className="section-title" style={{ margin: 0 }}>Transactions</h2>
        <span className="tx-count">{filtered.length} entries</span>
      </div>

      <div className="filters">
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="tx-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col" aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="tx-empty">No transactions match your filters.</td>
            </tr>
          ) : filtered.map(t => {
            const style = CATEGORY_STYLE[t.category] ?? CATEGORY_STYLE.other;
            return (
              <tr key={t.id}>
                <td className="tx-date">{t.date}</td>
                <td className="tx-description">{t.description}</td>
                <td>
                  <span className="cat-badge" style={style}>{t.category}</span>
                </td>
                <td className={`tx-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '−'}${Number(t.amount).toFixed(2)}
                </td>
                <td>
                  {pendingDelete === t.id ? (
                    <span className="inline-confirm">
                      <button
                        className="confirm-btn"
                        onClick={() => { onDelete(t.id); setPendingDelete(null); }}
                      >
                        Delete
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setPendingDelete(null)}
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      className="delete-btn"
                      aria-label={`Delete transaction: ${t.description}`}
                      onClick={() => setPendingDelete(t.id)}
                    >
                      ✕
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList
