# Personal Finance Tracker (React + Vite)

**🌐 Live Demo:** [https://amazing-ganache-84b1f9.netlify.app/](https://amazing-ganache-84b1f9.netlify.app/)

A production-quality Personal Finance Tracker application that lets you track income, expenses, and per-category monthly budgets with a clean, responsive UI. Built as per the assignment requirements.

## ✨ Features

- Global Header & Footer with navigation (React Router)
- **Dashboard** with four KPIs (Total Income, Total Expenses, Remaining Budget, Savings)
- Interactive Recharts:
  - Monthly Income/Expense Trend (bar)
  - Category-wise Expense Split (pie)
- **Today's Expenses** table
- **Date Filter** (applies to dashboard totals)
- **Transactions** page:
  - Sortable table (Type, Amount, Category, Date, Description)
  - Add/Edit/Delete with modal form
- **Budgets** page:
  - Set per-category monthly budgets
  - Visual progress bars (spend vs. budget)
  - Real-time overspend toast alerts
- **Profile** page:
  - User details (name, email)
  - Default currency selection (₹, $, €, £, ¥)
  - Lifetime total expenses and savings
- Toast notifications for add/edit/delete and overspend
- Persistence via `localStorage`
- Responsive (mobile ↔ desktop)
- Pre-configured Prettier

## 🛠️ Tech Stack

- React 18 + Vite
- React Router v6
- Recharts (charts)
- React Toastify (toasts)
- dayjs (dates)

## 🚀 Getting Started

```bash
# 1) Install deps
npm install

# 2) Run locally
npm run dev

# 3) Build for production
npm run build
npm run preview
