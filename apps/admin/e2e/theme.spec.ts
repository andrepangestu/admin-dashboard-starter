import { expect, test } from '@playwright/test';

test('operator can switch to dark theme and the choice persists', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.reload();

  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();
});
