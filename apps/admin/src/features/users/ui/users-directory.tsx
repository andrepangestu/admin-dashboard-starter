import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';

import type { User, UserStatus } from '../model/user';

const statusToneClass: Record<UserStatus, string> = {
  active: 'text-success',
  invited: 'text-warning',
  suspended: 'text-destructive',
};

function formatStatus(status: UserStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('name', {
    header: 'User',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <span className="table-avatar" aria-hidden="true">
          {initials(info.getValue())}
        </span>
        <strong>{info.getValue()}</strong>
      </div>
    ),
  }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`inline-flex items-center gap-2 font-semibold ${statusToneClass[info.getValue()]}`}
      >
        <span className="size-2 rounded-full bg-current" aria-hidden="true" />
        {formatStatus(info.getValue())}
      </span>
    ),
  }),
];

function ariaSort(direction: false | 'asc' | 'desc'): 'ascending' | 'descending' | 'none' {
  if (direction === 'asc') {
    return 'ascending';
  }
  if (direction === 'desc') {
    return 'descending';
  }
  return 'none';
}

interface UsersDirectoryProps {
  users: User[];
  totalCount: number;
}

export function UsersDirectory({ users, totalCount }: UsersDirectoryProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // The React Compiler skips this component: useReactTable returns functions it cannot memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: users,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  const rows = table.getRowModel().rows;

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
    <>
      <div className="table-toolbar">
        <div>
          <strong>Workspace directory</strong>
          <span>{totalCount} total users</span>
        </div>
        <Input
          type="search"
          className="search-input"
          aria-label="Search users"
          placeholder="Search users"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">
            U
          </span>
          <h2>No users match your search</h2>
          <p>Try a different name or email address.</p>
        </div>
      ) : (
        <>
          <Table>
            <TableCaption className="sr-only">
              Workspace users and their current access status
            </TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      scope="col"
                      aria-sort={ariaSort(header.column.getIsSorted())}
                      className="h-auto px-5 pt-4 pb-2.5 text-[0.68rem] font-semibold tracking-[0.04em] uppercase text-muted-foreground/80"
                    >
                      <button
                        type="button"
                        className="table-sort"
                        onClick={() =>
                          header.column.toggleSorting(header.column.getIsSorted() === 'asc')
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </button>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} className="border-border/60 hover:bg-accent/40">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-5 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {table.getPageCount() > 1 ? (
            <div className="table-pagination">
              <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="table-pagination-controls">
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Previous page"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Next page"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
