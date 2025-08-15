import { useEffect, useState } from 'react'
import { useFinance } from '../context/FinanceContext.jsx'

const CATEGORIES = ['Salary','Freelance','Groceries','Transport','Entertainment','Utilities','Rent','Health','Education','Shopping','Other']

export default function TransactionForm({ open, onClose, edit }){
  const { addTransaction, updateTransaction } = useFinance()
  const [form, setForm] = useState({
    type: 'expense', amount: '', category: 'Groceries', date: new Date().toISOString().slice(0,10), description: ''
  })

  useEffect(()=>{
    if(edit){
      setForm({ type: edit.type, amount: edit.amount, category: edit.category, date: edit.date, description: edit.description || '' })
    }
  }, [edit])

  if(!open) return null

  function submit(e){
    e.preventDefault()
    const payload = { ...form, amount: Number(form.amount) }
    if(edit){
      updateTransaction(edit.id, payload)
    }else{
      addTransaction(payload)
    }
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="section-title">{edit ? 'Edit' : 'Add'} Transaction</div>
        <form onSubmit={submit} style={{display:'grid', gap:12}}>
          <div className="form-row">
            <div>
              <div className="subtle">Type</div>
              <select className="select" value={form.type} onChange={e=>setForm(f=>({...f, type: e.target.value}))}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <div className="subtle">Amount</div>
              <input required className="input" type="number" min="0" step="0.01" value={form.amount} onChange={e=>setForm(f=>({...f, amount: e.target.value}))} />
            </div>
          </div>

          <div className="form-row">
            <div>
              <div className="subtle">Category</div>
              <select className="select" value={form.category} onChange={e=>setForm(f=>({...f, category: e.target.value}))}>
                {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div className="subtle">Date</div>
              <input className="date" type="date" value={form.date} onChange={e=>setForm(f=>({...f, date: e.target.value}))} />
            </div>
          </div>

          <div>
            <div className="subtle">Description</div>
            <textarea className="textarea" rows="3" value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))} />
          </div>

          <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" type="submit">{edit ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
