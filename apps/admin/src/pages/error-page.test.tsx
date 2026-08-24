import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RouteErrorPage } from './error-page';

describe('RouteErrorPage', () => {
  it('announces the failure and offers a retry action', async () => {
    const reset = vi.fn();
    const user = userEvent.setup();

    render(<RouteErrorPage error={new Error('Boom')} reset={reset} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Boom')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try this view again' }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
