import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { defaultBudgets, defaultProfile, defaultTransactions } from '../utils/defaultData.js'

const FinanceContext = createContext(null)

const STORAGE_KEY = 'pft_v1'

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw){
      return { transactions: defaultTransactions, budgets: defaultBudgets, profile: defaultProfile }
    }
    const parsed = JSON.parse(raw)
    return { transactions: parsed.transactions ?? [], budgets: parsed.budgets ?? [], profile: parsed.profile ?? defaultProfile }
  }catch(e){
    console.error(e)
    return { transactions: defaultTransactions, budgets: defaultBudgets, profile: defaultProfile }
  }
}

export function FinanceProvider({ children }){
  const [transactions, setTransactions] = useState(load().transactions)
  const [budgets, setBudgets] = useState(load().budgets)
  const [profile, setProfile] = useState(load().profile)
  const [range, setRange] = useState({ from: '', to: '' })

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, budgets, profile }))
  }, [transactions, budgets, profile])

  // Derived
  const filteredTx = useMemo(()=>{
    return transactions.filter(tx => {
      if(!range.from && !range.to) return true
      const d = dayjs(tx.date)
      const okFrom = range.from ? d.isAfter(dayjs(range.from).subtract(1,'day')) : true
      const okTo = range.to ? d.isBefore(dayjs(range.to).add(1,'day')) : true
      return okFrom && okTo
    })
  }, [transactions, range])

  const totals = useMemo(()=>{
    const income = filteredTx.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0)
    const expenses = filteredTx.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0)
    const savings = income - expenses
    const totalBudget = budgets.reduce((a,b)=>a+b.amount,0)
    const remainingBudget = totalBudget - expenses
    return { income, expenses, savings, remainingBudget, totalBudget }
  }, [filteredTx, budgets])

  // Category spend map (current month for budgets)
  const monthKey = dayjs().format('YYYY-MM')
  const categorySpend = useMemo(()=>{
    const map = {}
    transactions.forEach(t=>{
      const key = dayjs(t.date).format('YYYY-MM')
      if(key !== monthKey) return
      if(t.type!=='expense') return
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return map
  }, [transactions])

  // Overspend notifications
  useEffect(()=>{
    budgets.forEach(b=>{
      const spent = categorySpend[b.category] || 0
      if(spent > b.amount){
        toast.error(`Budget exceeded: ${b.category} by ${format(spent - b.amount, profile.currency)}`, { toastId: `over-${b.category}-${monthKey}`})
      }
    })
  }, [categorySpend, budgets, profile.currency])

  function addTransaction(tx){
    setTransactions(prev => [{ ...tx, id: crypto.randomUUID() }, ...prev])
    toast.success('Transaction added')
  }
  function updateTransaction(id, updates){
    setTransactions(prev => prev.map(t=> t.id===id ? { ...t, ...updates } : t))
    toast.success('Transaction updated')
  }
  function deleteTransaction(id){
    setTransactions(prev => prev.filter(t=> t.id!==id))
    toast.info('Transaction deleted')
  }

  function upsertBudget(category, amount){
    setBudgets(prev=>{
      const idx = prev.findIndex(b=>b.category===category)
      const next = [...prev]
      if(idx>=0) next[idx] = { category, amount }
      else next.push({ category, amount })
      return next
    })
    toast.success('Budget saved')
  }

  function setCurrency(cur){
    setProfile(prev=>({ ...prev, currency: cur }))
    toast.success('Currency updated')
  }
  function updateProfile(up){
    setProfile(prev=> ({ ...prev, ...up }))
    toast.success('Profile updated')
  }

  const value = {
    transactions, budgets, profile, totals, range, setRange,
    addTransaction, updateTransaction, deleteTransaction,
    upsertBudget, setCurrency, updateProfile, categorySpend
  }
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance(){
  const ctx = useContext(FinanceContext)
  if(!ctx) throw new Error('useFinance must be used within FinanceProvider')
  return ctx
}

export function format(amount, currency){
  return new Intl.NumberFormat(undefined, { style:'currency', currency }).format(amount)
}
