import { expect, test } from '@playwright/test';

test.describe('Navigation Tests', () => {
	test('homepage loads correctly', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Welcome/);
		await expect(page.locator('h1')).toContainText('Welcome to your new');
	});

	test('about page loads correctly', async ({ page }) => {
		await page.goto('/about');
		await expect(page).toHaveTitle(/About/);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('sverdle page should load', async ({ page }) => {
		await page.goto('/sverdle');

		// Seharusnya tidak 404
		await expect(page).not.toHaveURL(/.*404.*/);

		// Seharusnya punya title Sverdle
		await expect(page).toHaveTitle(/Sverdle/);

		// Seharusnya ada grid game
		await expect(page.locator('.grid')).toBeVisible();
	});

	test('sverdle how-to-play page loads correctly', async ({ page }) => {
		await page.goto('/sverdle/how-to-play');
		await expect(page).not.toHaveURL(/.*404.*/);
		await expect(page.locator('h1')).toBeVisible();
	});

	test('header navigation works', async ({ page }) => {
		await page.goto('/');

		// Click About link
		await page.click('text=About');
		await expect(page).toHaveURL(/.*about/);

		// Click Home
		await page.click('text=Home');
		await expect(page).toHaveURL(/\/$/);

		// Click Sverdle
		await page.click('text=Sverdle');
		await expect(page).toHaveURL(/.*sverdle/);
	});
});
