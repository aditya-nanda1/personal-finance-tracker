import { useFinance } from '../context/FinanceContext.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
import ChartMonthlyTrend from '../components/ChartMonthlyTrend.jsx'
import ChartCategoryPie from '../components/ChartCategoryPie.jsx'
import TodayExpensesTable from '../components/TodayExpensesTable.jsx'
import DateRangePicker from '../components/DateRangePicker.jsx'

export default function Dashboard(){
  const { totals, range, setRange, profile, transactions, categorySpend } = useFinance()

  return (
    <div className="grid" style={{gap:16}}>
      <div className="grid cards">
        <SummaryCard title="Total Income" value={totals.income} currency={profile.currency} hint="All filtered transactions" />
        <SummaryCard title="Total Expenses" value={totals.expenses} currency={profile.currency} />
        <SummaryCard title="Remaining Budget" value={totals.remainingBudget} currency={profile.currency} />
        <SummaryCard title="Savings" value={totals.savings} currency={profile.currency} />
      </div>

      <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:16}}>
        <ChartMonthlyTrend transactions={transactions} />
        <ChartCategoryPie data={categorySpend} />
      </div>

      <DateRangePicker value={range} onChange={setRange} />
      <TodayExpensesTable />
    </div>
  )
}
