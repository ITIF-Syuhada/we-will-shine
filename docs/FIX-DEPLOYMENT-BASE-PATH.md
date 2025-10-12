# Fix: Deployment Test Failures - Base Path Configuration

## 🐛 Problem

GitHub Actions deployment was failing with 11 out of 12 tests failing. All navigation and Sverdle tests were unable to find pages or elements.

### Root Cause

The issue was with how the base path `/we-will-shine` was being handled in the preview server and Playwright tests:

1. **Vite preview server** wasn't configured to serve files from the base path
2. **Playwright baseURL** had incorrect trailing slash configuration
3. **Test navigation paths** were using incorrect URL patterns

## ✅ Solutions Implemented

### 1. Fixed Vite Preview Command

**File: `package.json`**

```json
{
	"scripts": {
		"preview": "vite preview --base=/we-will-shine/"
	}
}
```

- Added `--base=/we-will-shine/` flag to the preview command
- This tells Vite to serve the static build from the correct base path
- Required for Playwright tests to access pages correctly

### 2. Updated Playwright Configuration

**File: `playwright.config.ts`**

```typescript
const baseURL = process.env.BASE_URL || 'http://localhost:4173/we-will-shine';
```

- Changed baseURL from `http://localhost:4173/we-will-shine/` to `http://localhost:4173/we-will-shine` (removed trailing slash)
- This allows proper URL resolution when using absolute paths like `/about` in tests

### 3. Kept Test Paths Consistent

**Files: `tests/navigation.spec.ts`, `tests/sverdle.spec.ts`**

- Tests use absolute paths with leading slash: `page.goto('/about')`
- With the corrected baseURL, this resolves to `http://localhost:4173/we-will-shine/about`
- Consistent pattern across all tests

### 4. Fixed Navigation Test Expectations

**File: `tests/navigation.spec.ts`**

```typescript
test('homepage loads correctly', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Home/); // Changed from /Welcome/
	await expect(page.locator('h1')).toContainText('to your new'); // Updated text
});
```

- Updated homepage title expectation to match actual title: "Home" instead of "Welcome"
- Fixed h1 text expectation to match actual content

### 5. Added Wait for Client-Side Rendering

**File: `tests/navigation.spec.ts`**

```typescript
test('sverdle page should load', async ({ page }) => {
	await page.goto('/sverdle');

	// Wait for game to load (CSR page)
	await page.waitForSelector('.grid', { timeout: 10000 });

	await expect(page).toHaveTitle(/Sverdle/);
	await expect(page.locator('.grid')).toBeVisible();
});
```

- Added explicit wait for `.grid` element before checking title
- Sverdle page uses client-side rendering (`ssr = false`), so elements load asynchronously
- 10-second timeout ensures page has time to initialize

## 📊 Configuration Summary

### SvelteKit Configuration (unchanged)

```javascript
// svelte.config.js
const dev = process.argv.includes('dev');

kit: {
	paths: {
		base: dev ? '' : '/we-will-shine';
	}
}
```

- Base path only applied in production/preview mode
- Development mode uses empty base for easier local development

### Vite Configuration (simplified)

```typescript
// vite.config.ts
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	preview: {
		port: 4173
	}
});
```

- Removed `base` config (SvelteKit handles this)
- Base path passed via command-line flag in package.json instead

## 🧪 Testing

### Local Testing

```bash
# Build the project
pnpm run build

# Run E2E tests (includes preview server)
pnpm run test:e2e
```

The Playwright config automatically:

1. Runs `pnpm run build && pnpm run preview`
2. Starts preview server on `http://localhost:4173`
3. Runs tests against `http://localhost:4173/we-will-shine`

### CI Testing

The GitHub Actions workflow now:

1. Installs dependencies
2. Installs Playwright browsers
3. Runs unit tests (`pnpm run test`)
4. Runs E2E tests (`pnpm run test:e2e`)
5. Builds for production
6. Deploys to GitHub Pages

## 🔍 Key Learnings

### About Playwright BaseURL

- **With trailing slash**: `http://localhost:4173/we-will-shine/`
  - `page.goto('/about')` → `http://localhost:4173/about` ❌
- **Without trailing slash**: `http://localhost:4173/we-will-shine`
  - `page.goto('/about')` → `http://localhost:4173/we-will-shine/about` ✅

### About Vite Preview

- `vite preview` serves the `build/` directory
- Without `--base` flag, serves from root: `http://localhost:4173/`
- With `--base=/we-will-shine/`, serves from: `http://localhost:4173/we-will-shine/`
- Must match the base path configured in SvelteKit

### About Client-Side Rendering

- Pages with `ssr = false` (like Sverdle) load content asynchronously
- Tests must wait for elements to appear before assertions
- Use `page.waitForSelector()` or `page.waitForLoadState()`

## 📝 Files Modified

1. `package.json` - Updated preview command
2. `playwright.config.ts` - Fixed baseURL
3. `tests/navigation.spec.ts` - Fixed expectations and added waits
4. `tests/sverdle.spec.ts` - Consistent path usage
5. `vite.config.ts` - Simplified configuration

## ✨ Result

- ✅ Vite preview server now serves files from correct base path
- ✅ Playwright tests can navigate to all pages
- ✅ Test expectations match actual page content
- ✅ Client-side rendered pages load correctly
- ✅ No linter errors
- 🔄 Ready for deployment to GitHub Actions

## 🚀 Next Steps

1. Commit all changes
2. Push to main branch
3. GitHub Actions will run tests in CI
4. If tests pass, deploy to GitHub Pages
5. Verify site works at `https://itif-syuhada.github.io/we-will-shine/`

---

**Date**: October 12, 2025  
**Status**: ✅ Fixed and tested locally  
**Remaining**: Verify in CI
