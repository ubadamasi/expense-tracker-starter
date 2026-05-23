Deploy the app to staging by running tests, building the production bundle, and pushing to the staging environment.

## Steps

Follow these steps in order. Stop and report clearly if any step fails — do not proceed to the next step.

### 1. Run tests

Run the project's test suite:

```bash
npm test
```

If there is no test script configured (check package.json), skip this step and note it in your output. This project currently has no tests, so note that and continue.

### 2. Lint

Run ESLint to catch any code issues before building:

```bash
npm run lint
```

Fix any errors before proceeding. Warnings are acceptable but must be reported.

### 3. Production build

Build the production bundle:

```bash
npm run build
```

Confirm the `dist/` directory was created and report the output bundle size.

### 4. Push to staging

Deploy the contents of `dist/` to staging. Use whichever method is configured for this project:

- If a `deploy:staging` npm script exists, run it.
- If a hosting CLI is available (e.g. `vercel`, `netlify`, `firebase`), run the appropriate staging deploy command.
- If none of the above apply, report that no staging deployment method is configured and ask the user how they want to push `dist/`.

### 5. Summary

Print a short deploy summary:
- Tests: passed / skipped (reason)
- Lint: passed / warnings (list them)
- Build: succeeded, bundle size
- Staging: URL or status
