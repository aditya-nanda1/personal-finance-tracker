import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Budgets from './pages/Budgets.jsx'
import Profile from './pages/Profile.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'
import { ToastContainer } from 'react-toastify'

export default function App(){
  return (
    <FinanceProvider>
      <div className="app-shell">
        <header className="header">
          <div className="container header-inner">
            <div className="brand">
              <div className="brand-logo">₹</div>
              <div>Personal Finance Tracker</div>
            </div>
            <nav className="nav">
              <NavLink to="/" end>Dashboard</NavLink>
              <NavLink to="/transactions">Transactions</NavLink>
              <NavLink to="/budgets">Budgets</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </nav>
          </div>
        </header>

        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} Personal Finance Tracker · Built with React + Vite</div>
        </footer>
        <ToastContainer position="top-right" theme="dark" />
      </div>
    </FinanceProvider>
  )
}
