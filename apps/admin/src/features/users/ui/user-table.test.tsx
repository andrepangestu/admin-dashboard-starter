import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { User } from '../model/user';
import { UserTable } from './user-table';

const activeUser: User = {
  id: 'usr_001',
  name: 'Alya Rahman',
  email: 'alya@example.com',
  role: 'Administrator',
  status: 'active',
};

describe('UserTable', () => {
  it('shows a useful empty state when no users are available', () => {
    render(<UserTable users={[]} />);

    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(
      screen.getByText('Try changing the filters or invite the first user.'),
    ).toBeInTheDocument();
  });

  it('renders recognizable user details', () => {
    render(<UserTable users={[activeUser]} />);

    expect(screen.getByRole('cell', { name: 'Alya Rahman' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'alya@example.com' })).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
