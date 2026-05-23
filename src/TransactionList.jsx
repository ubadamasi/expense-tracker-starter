import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

const CAT_STYLE = {
  food:          { color: '#FF8A65', background: 'rgba(255,138,101,0.12)' },
  housing:       { color: '#4F7EFF', background: 'rgba(79,126,255,0.12)' },
  utilities:     { color: '#FFD166', background: 'rgba(255,209,102,0.12)' },
  transport:     { color: '#00D98B', background: 'rgba(0,217,139,0.12)' },
  entertainment: { color: '#C77DFF', background: 'rgba(199,125,255,0.12)' },
  salary:        { color: '#06D6A0', background: 'rgba(6,214,160,0.12)' },
  other:         { color: '#8892A4', background: 'rgba(136,148,164,0.12)' },
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

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
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <table className="tx-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="tx-empty">No transactions match your filters.</td>
            </tr>
          ) : filtered.map(t => {
            const style = CAT_STYLE[t.category] ?? CAT_STYLE.other;
            return (
              <tr key={t.id}>
                <td className="tx-date">{t.date}</td>
                <td className="tx-description">{t.description}</td>
                <td>
                  <span className="cat-badge" style={style}>{t.category}</span>
                </td>
                <td className={`tx-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '−'}${parseFloat(t.amount).toFixed(2)}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => { if (window.confirm('Delete this transaction?')) onDelete(t.id); }}
                  >
                    ✕
                  </button>
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
