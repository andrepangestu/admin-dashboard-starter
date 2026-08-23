import type { ApiClient } from '@starter/api-client';
import type { PaginatedResponse } from '@starter/types';

import type { User } from '../model/user';

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
    status: 'active',
  },
  {
    id: 'usr_003',
    name: 'Nadia Putri',
    email: 'nadia@example.com',
    role: 'Analyst',
    status: 'invited',
  },
];

interface ListUsersOptions {
  api: ApiClient;
  useDemoData: boolean;
  signal?: AbortSignal;
}

export async function listUsers({
  api,
  useDemoData,
  signal,
}: ListUsersOptions): Promise<PaginatedResponse<User>> {
  if (useDemoData) {
    return {
      data: [...demoUsers],
      meta: { page: 1, pageSize: 20, total: demoUsers.length, totalPages: 1 },
    };
  }

  return api.request<PaginatedResponse<User>>(
    '/users?page=1&pageSize=20',
    signal ? { signal } : {},
  );
}
