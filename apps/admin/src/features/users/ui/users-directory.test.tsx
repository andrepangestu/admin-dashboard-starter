import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { User } from '../model/user';
import { UsersDirectory } from './users-directory';

const demoUsers: User[] = [
  {
    id: 'usr_001',
    name: 'Alya Rahman',
    email: 'alya@example.com',
    role: 'Administrator',
    status: 'active',
  },
  {
    id: 'usr_002',
    name: 'Dimas Pratama',
    email: 'dimas@example.com',
    role: 'Operations',
    status: 'suspended',
  },
  {
    id: 'usr_003',
    name: 'Nadia Putri',
    email: 'nadia@example.com',
    role: 'Analyst',
    status: 'invited',
  },
];

const manyUsers: User[] = Array.from({ length: 12 }, (_, index) => ({
  id: `usr_${String(index + 1).padStart(3, '0')}`,
  name: `User ${String(index + 1).padStart(2, '0')}`,
  email: `user${index + 1}@example.com`,
  role: 'Member',
  status: 'active',
}));

function renderDirectory(users: User[]) {
  return render(<UsersDirectory users={users} totalCount={users.length} />);
}

function firstBodyRow(): HTMLElement {
  const [, firstRow] = screen.getAllByRole('row');
  if (!firstRow) {
    throw new Error('Expected the table to render at least one body row');
  }
  return firstRow;
}

describe('UsersDirectory', () => {
  it('shows a useful empty state when no users are available', () => {
    renderDirectory([]);

    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(
      screen.getByText('Try changing the filters or invite the first user.'),
    ).toBeInTheDocument();
  });

  it('renders recognizable user details', () => {
    renderDirectory(demoUsers);

    expect(screen.getByRole('cell', { name: 'Alya Rahman' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'alya@example.com' })).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Suspended')).toBeInTheDocument();
    expect(screen.getByText('Invited')).toBeInTheDocument();
  });

  it('names the table for screen readers through its caption', () => {
    renderDirectory(demoUsers);

    expect(
      screen.getByRole('table', { name: 'Workspace users and their current access status' }),
    ).toBeInTheDocument();
  });

  it('filters users by name', async () => {
    const user = userEvent.setup();
    renderDirectory(demoUsers);

    await user.type(screen.getByRole('searchbox', { name: 'Search users' }), 'nadia');

    expect(screen.getByRole('cell', { name: 'Nadia Putri' })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Alya Rahman' })).not.toBeInTheDocument();
  });

  it('filters users by email', async () => {
    const user = userEvent.setup();
    renderDirectory(demoUsers);

    await user.type(screen.getByRole('searchbox', { name: 'Search users' }), 'dimas@example.com');

    expect(screen.getByRole('cell', { name: 'Dimas Pratama' })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: 'Nadia Putri' })).not.toBeInTheDocument();
  });

  it('shows a no-match state distinct from the no-users state', async () => {
    const user = userEvent.setup();
    renderDirectory(demoUsers);

    await user.type(screen.getByRole('searchbox', { name: 'Search users' }), 'zzz');

    expect(screen.getByText('No users match your search')).toBeInTheDocument();
    expect(screen.queryByText('No users found')).not.toBeInTheDocument();
  });

  it('sorts by user name and exposes the sort state', async () => {
    const user = userEvent.setup();
    renderDirectory(demoUsers);

    const userHeader = () => screen.getByRole('columnheader', { name: 'User' });
    await user.click(within(userHeader()).getByRole('button', { name: 'User' }));

    expect(userHeader()).toHaveAttribute('aria-sort', 'ascending');
    expect(within(firstBodyRow()).getByText('Alya Rahman')).toBeInTheDocument();

    await user.click(within(userHeader()).getByRole('button', { name: 'User' }));

    expect(userHeader()).toHaveAttribute('aria-sort', 'descending');
    expect(within(firstBodyRow()).getByText('Nadia Putri')).toBeInTheDocument();
  });

  it('paginates long lists with correct control bounds', async () => {
    const user = userEvent.setup();
    renderDirectory(manyUsers);

    expect(screen.getAllByRole('row')).toHaveLength(11);
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });
});
