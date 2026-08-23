import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

import { DashboardLayout } from '@/layouts/dashboard-layout';
import { DashboardPage } from '@/pages/dashboard-page';
import { RouteErrorPage } from '@/pages/error-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { UsersPage } from '@/pages/users-page';

const rootRoute = createRootRoute({
  component: DashboardLayout,
  errorComponent: RouteErrorPage,
  notFoundComponent: NotFoundPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersPage,
});

const routeTree = rootRoute.addChildren([dashboardRoute, usersRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => (
    <div className="route-state" role="status">
      Loading workspace…
    </div>
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
