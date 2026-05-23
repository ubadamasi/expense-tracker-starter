const fmt = (n) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="summary-card-label">Income</div>
        <div className="summary-card-value income-amount">${fmt(totalIncome)}</div>
      </div>
      <div className="summary-card">
        <div className="summary-card-label">Expenses</div>
        <div className="summary-card-value expense-amount">${fmt(totalExpenses)}</div>
      </div>
      <div className="summary-card">
        <div className="summary-card-label">Balance</div>
        <div className={`summary-card-value ${balance >= 0 ? 'income-amount' : 'expense-amount'}`}>
          {balance < 0 ? '−' : ''}${fmt(Math.abs(balance))}
        </div>
      </div>
    </div>
  );
}

export default Summary
