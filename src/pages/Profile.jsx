import { useFinance } from '../context/FinanceContext.jsx'
import { useState } from 'react'

const CURRENCIES = [
  { code:'INR', symbol:'₹' }, { code:'USD', symbol:'$' }, { code:'EUR', symbol:'€' }, { code:'GBP', symbol:'£' }, { code:'JPY', symbol:'¥' }
]

export default function Profile(){
  const { profile, setCurrency, updateProfile, transactions } = useFinance()
  const totalExpenses = transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0)
  const totalSavings = transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0) - totalExpenses
  const [edit, setEdit] = useState({ name: profile.name, email: profile.email })

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="section-title">User Details</div>
        <div className="form-row">
          <div>
            <div className="subtle">Name</div>
            <input className="input" value={edit.name} onChange={e=>setEdit(s=>({...s, name: e.target.value}))} />
          </div>
          <div>
            <div className="subtle">Email</div>
            <input className="input" type="email" value={edit.email} onChange={e=>setEdit(s=>({...s, email: e.target.value}))} />
          </div>
        </div>
        <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop: 10}}>
          <button className="btn primary" onClick={()=>updateProfile(edit)}>Save Profile</button>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Default Currency</div>
        <select className="select" value={profile.currency} onChange={e=>setCurrency(e.target.value)}>
          {CURRENCIES.map(c=> <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>)}
        </select>
      </div>

      <div className="grid cards">
        <div className="card">
          <div className="card-title">Lifetime Total Expenses</div>
          <div className="card-value">{new Intl.NumberFormat(undefined,{style:'currency',currency:profile.currency}).format(totalExpenses)}</div>
        </div>
        <div className="card">
          <div className="card-title">Lifetime Total Savings</div>
          <div className="card-value">{new Intl.NumberFormat(undefined,{style:'currency',currency:profile.currency}).format(totalSavings)}</div>
        </div>
      </div>
    </div>
  )
}
