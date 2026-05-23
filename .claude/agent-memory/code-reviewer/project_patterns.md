---
name: project-patterns
description: Recurring anti-patterns and quality notes found in the first full review (2026-05-23)
metadata:
  type: project
---

## First full review — 2026-05-23

### Bugs / correctness issues found

1. **App.jsx — stale closure in handleAdd** (line 21): `setTransactions([...transactions, transaction])` uses
   the transactions value captured at render time. If two adds fire quickly (or in React 18+ Strict Mode
   double-invoke), the second will drop the first. Fix: use functional updater
   `setTransactions(prev => [...prev, transaction])`. Same issue in handleDelete (line 25).

2. **TransactionForm — amount accepts zero and negatives** (line 13): validation is `!amount`, so `0` passes
   the guard (falsy) but `parseFloat("0")` yields 0 which silently adds a $0 transaction. The `min="0"`
   HTML attribute does not block programmatic or copy-pasted values. Fix: `parseFloat(amount) > 0`.

3. **TransactionForm — amount accepts non-numeric strings** (line 18): `parseFloat("12abc")` returns 12
   without any error. Fix: use `Number(amount)` which returns NaN for mixed strings, then check `isNaN`.

4. **TransactionForm — description whitespace** (line 13): `!description` passes `"   "` (spaces only).
   Fix: `!description.trim()`.

5. **TransactionForm — id collision risk** (line 16): `id: Date.now()` is millisecond-precision. Two rapid
   submits in the same millisecond yield duplicate ids, which breaks the `key` prop on table rows and
   could cause wrong rows to be deleted. Fix: use a module-level auto-increment counter or `crypto.randomUUID()`.

6. **Summary.jsx — parseFloat on numbers** (lines 7, 11): `amount` is already stored as a number
   (TransactionForm does `parseFloat` before calling onAdd). Calling `parseFloat` again is harmless but
   signals that the contract is not trusted. The real risk: seed data amounts are numbers, user-added amounts
   are numbers — if anything ever passes a string, both components would behave differently. Centralise the
   parse in App or TransactionForm only.

7. **SpendingChart — accumulates raw `t.amount` without parseFloat** (line 29): unlike Summary which calls
   parseFloat, SpendingChart does `acc[t.category] + t.amount` directly. If a string ever slips through,
   this produces string concatenation ("$150150" instead of "$300"). Inconsistent handling across the two
   consumers.

8. **TransactionList — `window.confirm` blocks the main thread** (line 76): synchronous confirm dialog is
   not accessible (cannot be styled, not keyboard-navigable in all browsers, blocked in cross-origin iframes).
   Should be replaced with an inline confirmation pattern.

### Accessibility gaps

- All `<label>` elements in TransactionForm lack `htmlFor` and their paired inputs lack `id`, so screen
  readers cannot associate them (lines 36-53 in TransactionForm).
- The delete button in TransactionList (line 74-79) has no `aria-label` — its visible content is "✕" which
  assistive technology reads as "multiplication sign" or nothing meaningful.
- The empty `<th></th>` for the delete column (TransactionList line 53) should have `aria-label="Actions"`
  or `scope="col"` to be valid.
- The type-toggle buttons in TransactionForm have no `role="group"` or `aria-label` on the wrapping div,
  so their relationship is not communicated to screen readers.

### Architecture / maintainability

- `categories` array and `CAT_STYLE`/`COLORS` color maps are duplicated across
  TransactionForm, TransactionList, and SpendingChart. Single source of truth should live in a shared
  `constants.js` module.
- `handleAdd` and `handleDelete` in App are not wrapped in `useCallback`, so new function references are
  created on every render and passed down. Not a bug, but causes unnecessary re-renders if child components
  are ever memoised.

### What is done well

- Controlled inputs throughout; all have value + onChange.
- `e.preventDefault()` is present on form submit.
- Filter state is correctly local to TransactionList.
- Stable `key={t.id}` used on list rows (not index).
- Empty-state rendering for both the table and the chart.
- `CAT_STYLE` fallback via `?? CAT_STYLE.other` handles unknown categories defensively.

**Why:** Recorded to track recurring patterns across future review sessions and avoid re-discovering the same issues.
**How to apply:** In future sessions, check whether these issues have been fixed before re-reporting them. If new
components are added, watch for the same stale-closure and duplicate-constants patterns.
