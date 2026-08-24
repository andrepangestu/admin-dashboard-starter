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

describe('DashboardLayout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    installMatchMedia(false);
  });

  it('shows the primary navigation with accessible names', async () => {
    await renderLayout();

    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
  });

  it('collapses the sidebar while keeping navigation names accessible', async () => {
    const user = userEvent.setup();
    await renderLayout();

    const toggle = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);

    const expandToggle = screen.getByRole('button', { name: 'Expand sidebar' });
    expect(expandToggle).toHaveAttribute('aria-expanded', 'false');
    expect(window.localStorage.getItem('admin-sidebar-collapsed')).toBe('true');
    expect(screen.getByRole('link', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
  });

  it('restores the persisted collapsed state', async () => {
    window.localStorage.setItem('admin-sidebar-collapsed', 'true');

    await renderLayout();

    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
