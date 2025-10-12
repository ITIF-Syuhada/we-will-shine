import { expect, test } from '@playwright/test';

test.describe('Sverdle Game Tests', () => {
	test.beforeEach(async ({ page }) => {
		// Clear localStorage before each test
		await page.goto('/we-will-shine/sverdle');
		await page.evaluate(() => localStorage.clear());
		await page.reload();
	});

	test('sverdle page loads correctly', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Should not be 404
		await expect(page).not.toHaveURL(/.*404.*/);

		// Should have correct title
		await expect(page).toHaveTitle(/Sverdle/);

		// Should have game grid
		await expect(page.locator('.grid')).toBeVisible();

		// Should have keyboard
		await expect(page.locator('.keyboard')).toBeVisible();

		// Should have how-to-play link
		await expect(page.locator('a.how-to-play')).toBeVisible();
	});

	test('can type letters using keyboard', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Wait for game to load
		await page.waitForSelector('.grid');

		// Type some letters
		await page.keyboard.press('h');
		await page.keyboard.press('e');
		await page.keyboard.press('l');
		await page.keyboard.press('l');
		await page.keyboard.press('o');

		// Check that letters appear in the grid
		const firstRow = page.locator('.grid .row').first();
		await expect(firstRow.locator('.letter').nth(0)).toContainText('h');
		await expect(firstRow.locator('.letter').nth(1)).toContainText('e');
		await expect(firstRow.locator('.letter').nth(2)).toContainText('l');
		await expect(firstRow.locator('.letter').nth(3)).toContainText('l');
		await expect(firstRow.locator('.letter').nth(4)).toContainText('o');
	});

	test('can click keyboard buttons', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Wait for keyboard to load
		await page.waitForSelector('.keyboard');

		// Click some letter buttons
		await page.click('button[data-key="h"]');
		await page.click('button[data-key="e"]');
		await page.click('button[data-key="l"]');
		await page.click('button[data-key="l"]');
		await page.click('button[data-key="o"]');

		// Check that letters appear in the grid
		const firstRow = page.locator('.grid .row').first();
		await expect(firstRow.locator('.letter').nth(0)).toContainText('h');
	});

	test('backspace removes letters', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Type some letters
		await page.keyboard.press('h');
		await page.keyboard.press('e');
		await page.keyboard.press('l');

		// Press backspace
		await page.keyboard.press('Backspace');

		// Check that last letter is removed
		const firstRow = page.locator('.grid .row').first();
		await expect(firstRow.locator('.letter').nth(2)).toContainText('');
	});

	test('enter button is disabled until 5 letters are typed', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Enter button should be disabled initially
		const enterButton = page.locator('button[data-key="enter"]');
		await expect(enterButton).toBeDisabled();

		// Type 5 letters
		await page.keyboard.press('h');
		await page.keyboard.press('e');
		await page.keyboard.press('l');
		await page.keyboard.press('l');
		await page.keyboard.press('o');

		// Enter button should now be enabled
		await expect(enterButton).toBeEnabled();
	});

	test('game state persists in localStorage', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Wait for game to initialize
		await page.waitForSelector('.grid');

		// Type a valid 5-letter word (assuming 'hello' might be valid)
		await page.keyboard.press('a');
		await page.keyboard.press('b');
		await page.keyboard.press('o');
		await page.keyboard.press('u');
		await page.keyboard.press('t');

		// Get localStorage before reload
		const beforeReload = await page.evaluate(() => localStorage.getItem('sverdle'));

		// Reload page
		await page.reload();

		// Wait for game to load again
		await page.waitForSelector('.grid');

		// Get localStorage after reload
		const afterReload = await page.evaluate(() => localStorage.getItem('sverdle'));

		// Should have same game state
		expect(afterReload).toBeTruthy();
		expect(afterReload).toBe(beforeReload);
	});

	test('restart button clears game', async ({ page }) => {
		await page.goto('/we-will-shine/sverdle');

		// Play until game over (submit 6 guesses)
		for (let i = 0; i < 6; i++) {
			await page.keyboard.press('a');
			await page.keyboard.press('b');
			await page.keyboard.press('o');
			await page.keyboard.press('u');
			await page.keyboard.press('t');
			await page.keyboard.press('Enter');

			// Wait a bit for the submission to process
			await page.waitForTimeout(100);
		}

		// Should show restart button
		const restartButton = page.locator('button.restart');
		await expect(restartButton).toBeVisible();

		// Click restart
		await restartButton.click();

		// Should clear localStorage
		const savedGame = await page.evaluate(() => localStorage.getItem('sverdle'));
		expect(savedGame).toBeNull();

		// Should reset to new game
		await page.waitForSelector('.keyboard');
		const enterButton = page.locator('button[data-key="enter"]');
		await expect(enterButton).toBeDisabled();
	});
});
