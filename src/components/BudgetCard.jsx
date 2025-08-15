import { useFinance, format } from '../context/FinanceContext.jsx'

export default function BudgetCard({ category, amount, spent }){
  const pct = Math.min(100, Math.round((spent/amount)*100))
  const over = spent > amount
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <div className="section-title">{category}</div>
      <div className="subtle">{format(spent,'INR')} / {format(amount,'INR')}</div>
      <div className={over ? 'progress over' : 'progress'}><span style={{width: `${Math.min(100,(spent/amount)*100)}%`}} /></div>
      <div className="subtle">{pct}% used {over && <span style={{color:'var(--danger)'}}>· Overspent by {format(spent-amount,'INR')}</span>}</div>
    </div>
  )
}
