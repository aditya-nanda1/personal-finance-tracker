import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#6C8CFF','#24D6AA','#f59e0b','#ef4444','#a78bfa','#22c55e','#f97316']

export default function ChartCategoryPie({ data }){
  const rows = Object.entries(data).map(([name, value]) => ({ name, value }))

  return (
    <div className="card">
      <div className="section-title">Category-wise Expense Split</div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={rows} dataKey="value" nameKey="name" outerRadius={110}>
            {rows.map((entry, index) => <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
