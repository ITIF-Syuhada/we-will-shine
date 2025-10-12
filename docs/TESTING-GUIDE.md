# Testing Guide - We Will Shine

## 📋 Daftar Isi

1. [Setup Testing](#setup-testing)
2. [Running Tests](#running-tests)
3. [Test Coverage](#test-coverage)
4. [Writing Tests](#writing-tests)

## 🚀 Setup Testing

### Install Dependencies

```bash
# Playwright sudah terinstall via package.json
pnpm install

# Install browser untuk Playwright (opsional untuk local testing)
pnpm exec playwright install chromium
```

### Konfigurasi

File konfigurasi: `playwright.config.ts`

```typescript
export default defineConfig({
	testDir: './tests',
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		url: 'http://localhost:4173/we-will-shine'
	}
});
```

## 🧪 Running Tests

### Commands

```bash
# Run semua tests (check + lint + e2e)
pnpm run test

# Run hanya E2E tests
pnpm run test:e2e

# Run dengan UI mode (interactive)
pnpm run test:e2e:ui

# Run spesifik test file
pnpm exec playwright test tests/navigation.spec.ts

# Run dengan debug
pnpm exec playwright test --debug
```

### Watch Mode

```bash
# Watch untuk perubahan code
pnpm run check:watch
```

## 📊 Test Coverage

### Navigation Tests (`tests/navigation.spec.ts`)

✅ **Homepage**

- Loads correctly
- Has correct title
- Shows welcome message

✅ **About Page**

- Loads correctly
- Has visible content

✅ **Sverdle Page**

- Loads without 404
- Has correct title
- Shows game grid

✅ **Sverdle How-to-play**

- Loads correctly
- No 404 errors

✅ **Header Navigation**

- Links work correctly
- Navigation between pages

### Sverdle Game Tests (`tests/sverdle.spec.ts`)

✅ **Game Initialization**

- Page loads correctly
- Grid is visible
- Keyboard is visible
- How-to-play link exists

✅ **Keyboard Input**

- Type letters via keyboard
- Letters appear in grid
- Click keyboard buttons works

✅ **Game Logic**

- Backspace removes letters
- Enter button disabled until 5 letters
- Enter button enabled with 5 letters

✅ **State Persistence**

- Game state saves to localStorage
- State persists after reload

✅ **Restart Functionality**

- Restart button appears after game over
- Restart clears localStorage
- New game starts fresh

## ✍️ Writing Tests

### Basic Structure

```typescript
import { expect, test } from '@playwright/test';

test.describe('Feature Tests', () => {
	test('description', async ({ page }) => {
		// Navigate
		await page.goto('/path');

		// Interact
		await page.click('button');

		// Assert
		await expect(page.locator('h1')).toBeVisible();
	});
});
```

### Best Practices

1. **Clear localStorage before tests**

```typescript
test.beforeEach(async ({ page }) => {
	await page.goto('/');
	await page.evaluate(() => localStorage.clear());
});
```

2. **Wait for elements**

```typescript
await page.waitForSelector('.element');
```

3. **Use data-testid untuk stability**

```typescript
<button data-testid="submit-btn">Submit</button>

await page.click('[data-testid="submit-btn"]');
```

4. **Test user behavior, bukan implementation**

```typescript
// ✅ Good - tests user interaction
await page.click('text=Submit');
await expect(page.locator('.success')).toBeVisible();

// ❌ Bad - tests implementation details
expect(component.state.submitted).toBe(true);
```

## 📈 CI/CD Integration

Tests berjalan otomatis di GitHub Actions:

```yaml
# .github/workflows/deploy.yml
- name: Run tests
  run: pnpm run test

- name: Run E2E tests
  run: pnpm run test:e2e
```

### Test Reports

Reports tersimpan sebagai artifacts di GitHub Actions:

- Report name: `playwright-report`
- Retention: 30 days
- Download dari Actions tab

## 🐛 Debugging

### Local Debugging

```bash
# Run dengan headed mode (lihat browser)
pnpm exec playwright test --headed

# Run dengan debug mode
pnpm exec playwright test --debug

# Run specific test dengan line number
pnpm exec playwright test tests/sverdle.spec.ts:45
```

### Screenshot & Video

Update `playwright.config.ts`:

```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### Trace Viewer

```bash
# Generate trace
pnpm exec playwright test --trace on

# View trace
pnpm exec playwright show-trace trace.zip
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [SvelteKit Testing](https://kit.svelte.dev/docs/testing)
- [Best Practices](https://playwright.dev/docs/best-practices)

## 🎯 Next Steps

Untuk menambah test coverage:

1. **User Interactions**
   - Form submissions
   - Error handling
   - Loading states

2. **Accessibility**
   - Screen reader tests
   - Keyboard navigation
   - ARIA labels

3. **Performance**
   - Page load times
   - Bundle sizes
   - Core Web Vitals

4. **Visual Regression**
   - Screenshot comparisons
   - Component rendering
