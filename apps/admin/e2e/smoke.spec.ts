import { expect, test } from '@playwright/test';

test('operator can navigate from overview to users', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Good morning, operator.' })).toBeVisible();
  await page.getByRole('link', { name: 'Users' }).click();

  await expect(page).toHaveURL(/\/users$/);
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
});
