import { useMemo, useState } from 'react'
import { useFinance, format } from '../context/FinanceContext.jsx'
import TransactionForm from './TransactionForm.jsx'

export default function TransactionTable(){
  const { transactions, deleteTransaction, profile } = useFinance()
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' })
  const [edit, setEdit] = useState(null)
  const [open, setOpen] = useState(false)

  const data = useMemo(()=>{
    const rows = [...transactions]
    rows.sort((a,b)=>{
      const A = a[sort.key]; const B = b[sort.key]
      if(sort.key==='date'){
        return sort.dir==='asc' ? A.localeCompare(B) : B.localeCompare(A)
      }
      if(typeof A === 'number'){
        return sort.dir==='asc' ? A-B : B-A
      }
      return sort.dir==='asc' ? String(A).localeCompare(String(B)) : String(B).localeCompare(String(A))
    })
    return rows
  }, [transactions, sort])

  function setSortKey(key){
    setSort(prev=> ({ key, dir: prev.key===key && prev.dir==='asc' ? 'desc' : 'asc' }))
  }

  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
        <div className="section-title">All Transactions</div>
        <button className="btn primary" onClick={()=>{ setEdit(null); setOpen(true) }}>Add Transaction</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={()=>setSortKey('type')}>Type</th>
            <th onClick={()=>setSortKey('amount')}>Amount</th>
            <th onClick={()=>setSortKey('category')}>Category</th>
            <th onClick={()=>setSortKey('date')}>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tx=>(
            <tr key={tx.id}>
              <td><span className="badge" style={{background: tx.type==='income' ? '#0f2a22' : '#2a1220', color: tx.type==='income' ? '#a7f3d0' : '#fecaca', borderColor: tx.type==='income' ? '#164e3f' : '#7a1f2e'}}>{tx.type}</span></td>
              <td>{format(tx.amount, profile.currency)}</td>
              <td>{tx.category}</td>
              <td>{tx.date}</td>
              <td>{tx.description || '-'}</td>
              <td>
                <div style={{display:'flex', gap:8}}>
                  <button className="btn" onClick={()=>{ setEdit(tx); setOpen(true) }}>Edit</button>
                  <button className="btn danger" onClick={()=>deleteTransaction(tx.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TransactionForm open={open} onClose={()=>setOpen(false)} edit={edit} />
    </div>
  )
}
