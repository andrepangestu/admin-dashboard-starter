import { expect, test } from '@playwright/test';

test('operator can search the user directory', async ({ page }) => {
  await page.goto('/users');

  await page.getByRole('searchbox', { name: 'Search users' }).fill('nadia');

  await expect(page.getByRole('cell', { name: 'Nadia Putri' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Alya Rahman' })).toBeHidden();
});

test('operator can sort users by name', async ({ page }) => {
  await page.goto('/users');

  const userHeader = page.getByRole('columnheader', { name: 'User' });
  await userHeader.getByRole('button', { name: 'User' }).click();
  await expect(userHeader).toHaveAttribute('aria-sort', 'ascending');
  await expect(page.getByRole('row').nth(1)).toContainText('Alya Rahman');

  await userHeader.getByRole('button', { name: 'User' }).click();
  await expect(userHeader).toHaveAttribute('aria-sort', 'descending');
  await expect(page.getByRole('row').nth(1)).toContainText('Nadia Putri');
});
