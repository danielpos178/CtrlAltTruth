import { test, expect } from '@playwright/test';

test('homepage has expected title and basic content', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Check that the page title is correct (assuming Next.js default or set title)
  // Ctrl+Alt+Truth should be the title or part of it
  await expect(page).toHaveTitle(/Ctrl\+Alt\+Truth|Next\.js/);

  // Check for the main heading or navigation
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();

});
