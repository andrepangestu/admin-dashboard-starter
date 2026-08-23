import { ApiError } from '@starter/api-client';
import { useQuery } from '@tanstack/react-query';

import { listUsers } from '@/features/users/api/list-users';
import { UsersDirectory } from '@/features/users/ui/users-directory';
import { env } from '@/shared/config/env';
import { api } from '@/shared/lib/api';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { PageHeader } from '@/shared/ui/page-header';

export function UsersPage() {
  const usersQuery = useQuery({
    queryKey: ['users', { page: 1 }],
    queryFn: ({ signal }) => listUsers({ api, useDemoData: env.ENABLE_MOCKS, signal }),
  });

  const isPermissionDenied =
    usersQuery.error instanceof ApiError && usersQuery.error.status === 403;

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Identity & access"
        title="Users"
        description="Manage the people who can enter this workspace and understand their current access."
        action={<Button>Invite user</Button>}
      />

      <Card className="table-card">
        {usersQuery.isPending ? (
          <div className="route-state" role="status">
            Loading users…
          </div>
        ) : null}

        {usersQuery.isError && isPermissionDenied ? (
          <div className="inline-error" role="alert">
            <div>
              <strong>You do not have permission to view users</strong>
              <span>Ask a workspace administrator to grant access to the directory.</span>
            </div>
          </div>
        ) : null}

        {usersQuery.isError && !isPermissionDenied ? (
          <div className="inline-error" role="alert">
            <div>
              <strong>Users could not be loaded</strong>
              <span>Check the API URL and your session, then try again.</span>
            </div>
            <Button variant="outline" onClick={() => void usersQuery.refetch()}>
              Try again
            </Button>
          </div>
        ) : null}

        {usersQuery.data ? (
          <UsersDirectory users={usersQuery.data.data} totalCount={usersQuery.data.meta.total} />
        ) : null}
      </Card>
    </div>
  );
}
