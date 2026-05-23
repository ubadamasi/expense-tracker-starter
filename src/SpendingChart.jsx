import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  food:          '#FF8A65',
  housing:       '#4F7EFF',
  utilities:     '#FFD166',
  transport:     '#00D98B',
  entertainment: '#C77DFF',
  salary:        '#06D6A0',
  other:         '#8892A4',
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-name">{name}</p>
      <p className="chart-tooltip-value">${value.toFixed(2)}</p>
    </div>
  );
};

function SpendingChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="chart-section">
      <h2 className="section-title">Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expense data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: '#4A5268', fontSize: 12, fontFamily: 'DM Sans' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={v => `$${v}`}
              tick={{ fill: '#4A5268', fontSize: 12, fontFamily: 'DM Sans' }}
              width={52}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map(entry => (
                <Cell key={entry.name} fill={COLORS[entry.name] ?? '#8892A4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
