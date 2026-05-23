import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <div className="add-transaction">
      <h2 className="section-title">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. Grocery run"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Amount</label>
            <input
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Type</label>
            <div className="type-toggle">
              <button
                type="button"
                className={type === 'income' ? 'active-income' : ''}
                onClick={() => setType('income')}
              >
                Income
              </button>
              <button
                type="button"
                className={type === 'expense' ? 'active-expense' : ''}
                onClick={() => setType('expense')}
              >
                Expense
              </button>
            </div>
          </div>
          <div className="form-field">
            <label>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">Add</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm
