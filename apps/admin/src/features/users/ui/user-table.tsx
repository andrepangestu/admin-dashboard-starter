import type { User } from '../model/user';

interface UserTableProps {
  users: User[];
}

function formatStatus(status: User['status']): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-mark" aria-hidden="true">
          U
        </span>
        <h2>No users found</h2>
        <p>Try changing the filters or invite the first user.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <caption className="sr-only">Workspace users and their current access status</caption>
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span className="table-avatar" aria-hidden="true">
                  {user.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <strong>{user.name}</strong>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status-badge status-${user.status}`}>
                  {formatStatus(user.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
