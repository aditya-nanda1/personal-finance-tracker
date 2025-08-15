import { useFinance } from '../context/FinanceContext.jsx'
import BudgetCard from '../components/BudgetCard.jsx'
import { useMemo, useState } from 'react'

export default function Budgets(){
  const { budgets, upsertBudget, categorySpend } = useFinance()
  const [form, setForm] = useState({ category:'Groceries', amount: '' })

  const byCategory = useMemo(()=>{
    const map = {}
    budgets.forEach(b=> map[b.category] = b.amount)
    return map
  }, [budgets])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="section-title">Set Monthly Budget</div>
        <div className="form-row">
          <div>
            <div className="subtle">Category</div>
            <input className="input" placeholder="e.g., Groceries" value={form.category} onChange={e=>setForm(f=>({...f, category: e.target.value}))} />
          </div>
          <div>
            <div className="subtle">Amount</div>
            <input className="input" type="number" min="0" step="0.01" value={form.amount} onChange={e=>setForm(f=>({...f, amount: e.target.value}))} />
          </div>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop: 10}}>
          <button className="btn primary" onClick={()=>{ if(!form.category || !form.amount) return; upsertBudget(form.category, Number(form.amount)); setForm({ category:'', amount:'' }) }}>Save Budget</button>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:16}}>
        {budgets.map(b=>(
          <BudgetCard key={b.category} category={b.category} amount={b.amount} spent={categorySpend[b.category] || 0} />
        ))}
      </div>
    </div>
  )
}
