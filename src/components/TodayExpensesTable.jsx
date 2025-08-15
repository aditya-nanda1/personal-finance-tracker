import dayjs from 'dayjs'
import { useFinance, format } from '../context/FinanceContext.jsx'

export default function TodayExpensesTable(){
  const { transactions, profile } = useFinance()
  const today = dayjs().format('YYYY-MM-DD')
  const rows = transactions.filter(t=> t.type==='expense' && t.date===today)

  return (
    <div className="card">
      <div className="section-title">Today's Expenses</div>
      <table className="table">
        <thead>
          <tr><th>Amount</th><th>Category</th><th>Note</th><th>Date</th></tr>
        </thead>
        <tbody>
          {rows.length===0 && <tr><td colSpan={4} className="subtle">No expenses today.</td></tr>}
          {rows.map(r=>(
            <tr key={r.id}>
              <td>{format(r.amount, profile.currency)}</td>
              <td>{r.category}</td>
              <td>{r.description || '-'}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
