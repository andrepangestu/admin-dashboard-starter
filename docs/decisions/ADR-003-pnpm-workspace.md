# ADR-003: Use a Lightweight pnpm Workspace

- Status: Accepted
- Date: 2026-08-03

## Context

The repository needs one executable app and a few reusable boundaries. It may be duplicated for other projects and may later gain another app or package. Independent repositories would make versioning and atomic changes harder, while a large platform monorepo is unnecessary.

## Decision

Use pnpm workspaces for dependency boundaries and Turborepo for task orchestration. Keep packages private until publishing is an explicit requirement.

## Consequences

- One lockfile makes local and CI resolution deterministic.
- `workspace:*` prevents accidental registry resolution of internal packages.
- Package boundaries are available without premature publication.
- Contributors must use pnpm rather than mixing package managers.

## Reconsider When

Projects need independent release cycles, separate access control, or deployment ownership that cannot be represented cleanly in one repository.
