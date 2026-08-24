import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { ThemeProvider } from '@/app/theme-provider';
import { installMatchMedia } from '@/test/match-media';

import { DashboardLayout } from './dashboard-layout';

async function renderLayout() {
  const rootRoute = createRootRoute({ component: DashboardLayout });
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Overview stub</div>,
  });
  const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/users',
    component: () => <div>Users stub</div>,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute, usersRoute]),
    history: createMemoryHistory(),
  });

  render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
  await screen.findByText('Overview stub');
}

describe('CommandMenu', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    installMatchMedia(false);
  });

  it('opens with the keyboard shortcut and navigates to a page', async () => {
    const user = userEvent.setup();
    await renderLayout();

    await user.keyboard('{Control>}k{/Control}');

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(await screen.findByRole('option', { name: 'Users' }));

    expect(await screen.findByText('Users stub')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the topbar button', async () => {
    const user = userEvent.setup();
    await renderLayout();

    await user.click(screen.getByRole('button', { name: 'Open command menu' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('switches the theme from the command menu', async () => {
    const user = userEvent.setup();
    await renderLayout();

    await user.keyboard('{Control>}k{/Control}');
    await user.click(await screen.findByRole('option', { name: 'Dark theme' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
