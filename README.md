# Personal Finance Tracker (React + Vite)

A production-quality Personal Finance Tracker application that lets you track income, expenses, and per-category monthly budgets with a clean, responsive UI. Built as per the assignment requirements.

## ✨ Features

- Global Header & Footer with navigation (React Router)
- **Dashboard** with four KPIs (Total Income, Total Expenses, Remaining Budget, Savings)
- Interactive Recharts:
  - Monthly Income/Expense Trend (line)
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
```

## 📦 Deployment

You can deploy on **Netlify** or **Vercel** easily by importing this repository.
The app is a standard Vite+React project that builds with `npm run build` and serves `dist/`.

Include your deployed link in this README under a "Live Demo" section.

## 🧰 Project Structure

```
personal-finance-tracker/
├─ src/
│  ├─ components/
│  ├─ context/
│  ├─ pages/
│  ├─ utils/
│  ├─ main.jsx
│  └─ App.jsx
├─ index.html
├─ package.json
├─ vite.config.js
├─ README.md
└─ ...
```

## 🧪 Default Data

The app ships with a few seed transactions and budgets to help you see charts and tables immediately (stored in `src/utils/defaultData.js`). Everything persists to `localStorage` with the key `pft_v1`.

## ✅ Notes Mapped to Requirements

- Pure React with functional components & hooks ✅
- React Router for navigation ✅
- Data persisted to localStorage ✅
- Dashboard cards, charts, and today's expenses ✅
- Transactions CRUD with sortable table ✅
- Budgets with progress & overspend alerts ✅
- Profile with currency switch and totals ✅
- Toastify events for add/edit/delete & overspend ✅
- Responsive design ✅
- Prettier configured via `npm run format` ✅
- Add some default data ✅

> Deploy on Netlify/Vercel and add your live link here once done.

---

Made with ❤️ for clean UI, accessibility, and performance.
