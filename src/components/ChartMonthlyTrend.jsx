
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import dayjs from 'dayjs'
import { useMemo } from 'react'

export default function ChartMonthlyTrend({ transactions }){
  const data = useMemo(()=>{
    const map = {}
    transactions.forEach(t=>{
      const key = dayjs(t.date).format('YYYY-MM')
      if(!map[key]) map[key] = { month: key, income: 0, expense: 0 }
      map[key][t.type] += t.amount
    })
    return Object.values(map).sort((a,b)=> a.month.localeCompare(b.month))
  }, [transactions])

  return (
    <div className="card">
      <div className="section-title">Monthly Spending Trend</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="expense" fill="#ef4444" name="Expenses" />
          <Bar dataKey="income" fill="#22c55e" name="Income" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
