import { useFinance } from '../context/FinanceContext.jsx'
import TransactionTable from '../components/TransactionTable.jsx'

export default function Transactions(){
  const { totals, profile } = useFinance()
  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="section-title">Quick Stats</div>
        <div className="subtle">Income: {new Intl.NumberFormat(undefined,{style:'currency',currency:profile.currency}).format(totals.income)} · Expenses: {new Intl.NumberFormat(undefined,{style:'currency',currency:profile.currency}).format(totals.expenses)}</div>
      </div>
      <TransactionTable />
    </div>
  )
}
