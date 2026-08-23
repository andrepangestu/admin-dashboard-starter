# Admin Dashboard Starter Design

## Objective

Create a reusable admin-dashboard repository that can be copied and renamed for future projects. The repository must be understandable in Cursor before any package installation and must not download dependencies, install packages, generate code, run builds, or start development servers during scaffolding.

## Architecture

The repository is a lightweight pnpm workspace. `apps/admin` is a client-side React and TypeScript application built by Vite. Reusable boundaries live under `packages/`, initially as documented and type-safe placeholders so future projects can promote shared code without forcing premature abstraction.

Production delivery uses immutable static assets served by Nginx in a Docker container. The backend remains a separate HTTP API. Browser-side server state is reserved for TanStack Query, routing for TanStack Router, and local client state remains colocated with the feature that owns it.

## Repository Boundaries

- `apps/admin`: executable SPA, application shell, routes, features, and runtime configuration.
- `packages/ui`: reusable design-system primitives and tokens.
- `packages/api-client`: API transport boundary and future OpenAPI-generated client location.
- `packages/config`: shared TypeScript, lint, and formatting configuration boundary.
- `packages/types`: framework-independent shared domain types.
- `docs/product`: product scope and terminology.
- `docs/architecture`: durable descriptions of frontend, security, API, testing, and deployment architecture.
- `docs/decisions`: architectural decision records.
- `docs/plans`: human-oriented next-step and implementation plans.
- `docs/superpowers`: validated design and execution-plan records.

## Admin Application Skeleton

The admin app uses a feature-oriented source layout:

- `app/`: composition root, providers, router, and global styles.
- `layouts/`: dashboard shell and navigation composition.
- `features/`: isolated business capabilities with their own components, queries, and schemas.
- `pages/`: route-level composition only.
- `shared/`: app-local utilities and components that have multiple consumers.
- `test/`: test setup and reusable test helpers.

The initial route tree contains a dashboard overview, an example users feature, a not-found page, and an error boundary. Example data is explicitly identified as local demonstration data and is isolated behind the API boundary so it can be removed cleanly.

## Runtime Configuration and Data Flow

Only environment variables prefixed with `VITE_` may reach browser code. Runtime values are parsed through one configuration module. UI components do not call `fetch` directly: route/page composition calls feature query hooks, query hooks call the API client package, and the API client owns HTTP concerns and typed errors.

Authentication and authorization are documented but not falsely implemented without a backend contract. The starter defines extension points for session loading, protected routes, and permission checks. Tokens must not be placed in local storage by default; the preferred production contract uses secure, HTTP-only cookies with CSRF protection where required.

## UI and Accessibility

The starter establishes semantic layout regions, keyboard-accessible navigation, visible focus states, responsive behavior, reusable color and spacing tokens, and a small set of presentational primitives. It avoids building a broad component library before real product needs exist.

## Error Handling

Configuration failures fail early with a clear message. Route errors render a recoverable application-level state. API failures are normalized into a typed error shape, while expected empty states remain distinct from network and authorization errors.

## Testing Strategy

The manifests and configuration prepare three layers without executing them during scaffolding:

- Vitest and Testing Library for units and components.
- MSW for API-boundary tests.
- Playwright for critical browser journeys.

The initial files include representative test locations and scripts, but package installation and test execution are intentionally deferred.

## Deployment

The Dockerfile uses a dependency/build stage and an Nginx runtime stage. Nginx serves SPA fallback routing, long-lived caching for fingerprinted assets, no-cache behavior for the HTML entry point, a health endpoint, compression, and baseline security headers. Deployment documentation describes environment handling, container health, reverse-proxy/TLS responsibilities, and rollback expectations.

## Documentation and Governance

`AGENTS.md` is the operational entry point for developers and coding agents. The README explains the repository, prerequisites, first installation commands, local development, verification, Docker usage, and how to duplicate/rename the starter. ADRs record the important long-term choices: Vite over Next.js, feature-oriented organization, pnpm workspace boundaries, OpenAPI as the API contract, and Nginx static delivery.

## Explicit Non-Goals

- No dependency installation or network download.
- No build, test, lint, format, generator, or development-server execution.
- No backend implementation, database, SSR, or server components.
- No production authentication flow without the backend contract.
- No generated lockfile or generated OpenAPI client.
- No assumption that placeholder packages must be published independently.

## Acceptance Criteria

1. The complete repository exists under `outputs/admin-dashboard-starter` and opens directly in Cursor.
2. Workspace, package manifests, TypeScript, Vite, lint, formatting, test, Docker, and Nginx configuration files are present and internally consistent.
3. The React application skeleton demonstrates the intended architecture without claiming installed dependencies.
4. Architecture, ADR, product, deployment, and next-step documentation are present.
5. No package manager install, dependency download, build, test runner, or dev server is invoked while creating the scaffold.
6. Static verification confirms expected files, parseable JSON, consistent workspace package names, and absence of generated dependency/build directories.
