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

This is a single-component React app (Vite + React 19). All application logic lives in `src/App.jsx` — there are no separate components, hooks, utilities, or state management libraries.

**Known intentional issues (part of the course):**
- Bug: `amount` is stored as a string in state, so `.reduce()` concatenates instead of summing — totals display incorrectly.
- The `transactions` array uses `amount` as a string (`"5000"`) rather than a number.
- `"Freelance Work"` is seeded with `type: "expense"` but `category: "salary"`, which is inconsistent.
- All state (transactions, form fields, filters) is colocated in a single `App` component with no extraction.

**Data shape:**
```js
{ id: number, description: string, amount: string, type: "income"|"expense", category: string, date: "YYYY-MM-DD" }
```

**Categories:** `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`
