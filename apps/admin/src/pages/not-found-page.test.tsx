import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { NotFoundPage } from './not-found-page';

async function renderNotFoundPage() {
  const rootRoute = createRootRoute({ component: NotFoundPage });
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/missing'] }),
  });

  render(<RouterProvider router={router} />);
  await screen.findByText('This page is outside the workspace');
}

describe('NotFoundPage', () => {
  it('keeps the way back to the overview as a real link', async () => {
    await renderNotFoundPage();

    const backLink = screen.getByRole('link', { name: 'Return to overview' });
    expect(backLink).toHaveAttribute('href', '/');
  });
});
