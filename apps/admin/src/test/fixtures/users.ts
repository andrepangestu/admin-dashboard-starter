import type { User } from '@/features/users/model/user';

export const userFixture: User = {
  id: 'usr_fixture',
  name: 'Test Operator',
  email: 'operator@example.com',
  role: 'Operator',
  status: 'active',
};
