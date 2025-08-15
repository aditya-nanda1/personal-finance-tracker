import { format } from '../context/FinanceContext.jsx'

export default function SummaryCard({ title, value, hint, currency='INR' }){
  return (
    <div className="card kpi">
      <div>
        <div className="card-title">{title}</div>
        <div className="card-value">{typeof value === 'number' ? format(value, currency) : value}</div>
      </div>
      {hint && <div className="trend">{hint}</div>}
    </div>
  )
}
