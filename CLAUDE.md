# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build locally
```

There are no tests in this project.

## Architecture

React 19 + Vite app with no routing, state management library, or backend — data lives in component state only.

**Component tree:**
```
App                  — holds transactions[] state, passes it down
├── Summary          — derives and displays totalIncome, totalExpenses, balance from transactions[]
├── TransactionForm  — owns form field state; calls onAdd(transaction) prop to bubble up new entries
└── TransactionList  — owns filter state; receives transactions[] and renders the filtered table
```

**State ownership:**
- `transactions[]` — lives in `App`, the only shared state
- Form fields (description, amount, type, category) — local to `TransactionForm`
- Filter selects (filterType, filterCategory) — local to `TransactionList`

**Data shape:**
```js
{ id: number, description: string, amount: number, type: "income"|"expense", category: string, date: "YYYY-MM-DD" }
```

**Categories:** `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`
