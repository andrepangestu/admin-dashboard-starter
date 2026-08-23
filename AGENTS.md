# Repository Guidance for Coding Agents

## Scope

This file governs the entire repository. A more deeply nested `AGENTS.md` may add or override rules for its directory.

## Start Here

1. Inspect the closest feature and its tests before changing code.
2. Read the ADRs (`docs/decisions/`) and architecture docs that affect the requested area.
3. Consult `README.md`, `docs/product/product-scope.md`, and `docs/architecture/overview.md` only when the task needs setup or product context.
4. Update documentation when behavior, architecture, commands, or environment values change.

## Architectural Invariants

- `apps/admin` is a client-side React SPA. Do not add SSR or backend endpoints to it.
- The backend API is a separate deployment and repository boundary.
- UI components must not call `fetch` directly. Feature API modules call `@starter/api-client`.
- TanStack Query owns remote/server state. Keep short-lived UI state close to the component that owns it.
- TanStack Router owns navigation and route composition.
- Environment access is centralized in `apps/admin/src/shared/config/env.ts`.
- Reusable business capabilities live in `features/`; route files compose them but do not own business logic.
- Promote code into `packages/` only after it has multiple real consumers or a durable boundary.
- Generated OpenAPI files live in `packages/api-client/src/generated/` and must never be edited manually.

## Package Boundaries

- `@starter/admin`: executable application.
- `@starter/api-client`: HTTP transport, generated API bindings, and normalized API errors.
- `@starter/ui`: stable design-system primitives shared across applications.
- `@starter/types`: framework-independent shared types.
- `@starter/config`: shared static configuration.

Do not import from another package's private file path. Import only from declared package exports.

## Commands

Run commands from the repository root after dependencies are intentionally installed:

- `pnpm dev` — start the admin app.
- `pnpm lint` — run ESLint across workspaces.
- `pnpm typecheck` — run strict TypeScript checks.
- `pnpm test` — run unit and component tests.
- `pnpm test:e2e` — run Playwright journeys.
- `pnpm build` — create production assets.
- `pnpm format:check` — check formatting without rewriting files.

Use package filters while iterating, for example `pnpm --filter @starter/admin test`.

## Implementation Rules

- Keep TypeScript strict; do not use `any`, unchecked casts, or blanket lint suppressions to bypass design problems.
- Prefer focused files with one responsibility and explicit public types.
- Write tests before implementing behavior. Cover success, empty, error, and permission-sensitive states as applicable.
- Preserve keyboard access, semantic HTML, visible focus, reduced-motion behavior, and responsive layouts.
- Use `Button` and other stable primitives instead of creating visually divergent local copies.
- shadcn-generated components belong in `apps/admin/src/shared/ui` first. Promote them to `packages/ui` only when the shared API is proven.
- Never store authentication tokens in `localStorage` by default.
- Never log secrets, session tokens, personal data, or raw authorization headers.
- Validate untrusted runtime data at boundaries; TypeScript types alone are not runtime validation.

## API and OpenAPI

The file `packages/api-client/openapi/backend.openapi.yaml` is an empty valid contract supplied only to keep configuration inspectable. Replace it with the authoritative backend contract before running:

```bash
pnpm --filter @starter/api-client generate
```

Review generated diffs, then add a handwritten feature adapter. Do not expose generator-specific details throughout the UI.

## Documentation and Decisions

- Update an existing ADR when only its wording or status changes.
- Add a new ADR when changing a durable architectural decision.
- Plans belong under `docs/plans/`; completed plans remain as historical context.
- Avoid undocumented environment variables or repository scripts.

## Definition of Done

A change is complete when its focused tests pass, lint and typecheck pass, documentation is current, no generated file was edited manually, accessibility states were considered, and the diff contains no secrets or unrelated changes.
