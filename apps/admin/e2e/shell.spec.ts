import { expect, test } from '@playwright/test';

test('operator can jump to users through the command menu', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('ControlOrMeta+k');
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.getByPlaceholder('Type a command or search…').fill('users');
  await page.getByRole('option', { name: 'Users' }).click();

  await expect(page).toHaveURL(/\/users$/);
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
});

test('operator can change the theme from the account menu', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open account menu' }).click();
  await page.getByRole('menuitemradio', { name: 'Dark' }).click();

  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('sidebar collapse persists across reloads on desktop', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the collapse toggle is hidden on narrow viewports');

  await page.goto('/');

  await page.getByRole('button', { name: 'Collapse sidebar' }).click();
  await expect(page.getByRole('link', { name: 'Users' })).toBeVisible();

  await page.reload();

  await expect(page.getByRole('button', { name: 'Expand sidebar' })).toBeVisible();
});
