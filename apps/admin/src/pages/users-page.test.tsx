import { ApiError } from '@starter/api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { listUsers } from '@/features/users/api/list-users';
import type { User } from '@/features/users/model/user';

import { UsersPage } from './users-page';

vi.mock('@/features/users/api/list-users', () => ({
  listUsers: vi.fn(),
}));

const listUsersMock = vi.mocked(listUsers);

const users: User[] = [
  {
    id: 'usr_001',
    name: 'Alya Rahman',
    email: 'alya@example.com',
    role: 'Administrator',
    status: 'active',
  },
];

function paginated(data: User[]) {
  return {
    data,
    meta: { page: 1, pageSize: 20, total: data.length, totalPages: 1 },
  };
}

function renderUsersPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>,
  );
}

describe('UsersPage', () => {
  beforeEach(() => {
    listUsersMock.mockReset();
  });

  it('shows the directory once users load', async () => {
    listUsersMock.mockResolvedValue(paginated(users));

    renderUsersPage();

    expect(await screen.findByRole('cell', { name: 'Alya Rahman' })).toBeInTheDocument();
    expect(screen.getByText('1 total users')).toBeInTheDocument();
  });

  it('announces the loading state', () => {
    listUsersMock.mockReturnValue(new Promise(() => {}));

    renderUsersPage();

    expect(screen.getByRole('status')).toHaveTextContent('Loading users…');
  });

  it('offers a retry when loading fails', async () => {
    const user = userEvent.setup();
    listUsersMock.mockRejectedValueOnce(new Error('network down'));
    listUsersMock.mockResolvedValueOnce(paginated(users));

    renderUsersPage();

    expect(await screen.findByRole('alert')).toHaveTextContent('Users could not be loaded');

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('cell', { name: 'Alya Rahman' })).toBeInTheDocument();
    expect(listUsersMock).toHaveBeenCalledTimes(2);
  });

  it('explains a permission denial without offering a retry', async () => {
    listUsersMock.mockRejectedValue(new ApiError({ status: 403, message: 'Forbidden' }));

    renderUsersPage();

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'You do not have permission to view users',
    );
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
  });
});
