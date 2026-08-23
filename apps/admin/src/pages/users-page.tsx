import { useQuery } from '@tanstack/react-query';
import { Button, Card } from '@starter/ui';

import { listUsers } from '@/features/users/api/list-users';
import { UserTable } from '@/features/users/ui/user-table';
import { env } from '@/shared/config/env';
import { api } from '@/shared/lib/api';
import { PageHeader } from '@/shared/ui/page-header';

export function UsersPage() {
  const usersQuery = useQuery({
    queryKey: ['users', { page: 1 }],
    queryFn: ({ signal }) => listUsers({ api, useDemoData: env.ENABLE_MOCKS, signal }),
  });

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Identity & access"
        title="Users"
        description="Manage the people who can enter this workspace and understand their current access."
        action={<Button>Invite user</Button>}
      />

      <Card className="table-card">
        <div className="table-toolbar">
          <div>
            <strong>Workspace directory</strong>
            <span>{usersQuery.data?.meta.total ?? 0} total users</span>
          </div>
          <label className="search-field">
            <span className="sr-only">Search users</span>
            <input type="search" placeholder="Search users" disabled />
          </label>
        </div>

        {usersQuery.isPending ? (
          <div className="route-state" role="status">
            Loading users…
          </div>
        ) : null}

        {usersQuery.isError ? (
          <div className="inline-error" role="alert">
            <div>
              <strong>Users could not be loaded</strong>
              <span>Check the API URL and your session, then try again.</span>
            </div>
            <Button variant="secondary" onClick={() => void usersQuery.refetch()}>
              Try again
            </Button>
          </div>
        ) : null}

        {usersQuery.data ? <UserTable users={usersQuery.data.data} /> : null}
      </Card>
    </div>
  );
}
