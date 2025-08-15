export const defaultTransactions = [
  { id: crypto.randomUUID(), type:'income', amount: 90000, category:'Salary', date: new Date().toISOString().slice(0,10), description:'Monthly salary' },
  { id: crypto.randomUUID(), type:'expense', amount: 2200, category:'Transport', date: new Date().toISOString().slice(0,10), description:'Cab' },
  { id: crypto.randomUUID(), type:'expense', amount: 4500, category:'Groceries', date: new Date().toISOString().slice(0,10), description:'Weekly groceries' },
  { id: crypto.randomUUID(), type:'expense', amount: 2000, category:'Entertainment', date: new Date().toISOString().slice(0,10), description:'Movies' },
  { id: crypto.randomUUID(), type:'income', amount: 5000, category:'Freelance', date: new Date().toISOString().slice(0,10), description:'Side gig' },
]

export const defaultBudgets = [
  { category: 'Groceries', amount: 10000 },
  { category: 'Transport', amount: 4000 },
  { category: 'Entertainment', amount: 5000 },
  { category: 'Utilities', amount: 6000 },
]

export const defaultProfile = {
  name: 'Alex Doe',
  email: 'alex@example.com',
  currency: 'INR'
}
