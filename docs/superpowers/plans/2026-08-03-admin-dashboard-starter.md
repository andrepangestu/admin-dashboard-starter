# Admin Dashboard Starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a reusable, documented admin-dashboard monorepo scaffold that opens in Cursor before dependencies are installed.

**Architecture:** A pnpm workspace keeps one Vite-powered React SPA under `apps/admin` and narrowly scoped reusable packages under `packages/`. TanStack Router owns client routing, TanStack Query owns remote state, and an explicit API client boundary prevents UI code from calling HTTP directly. Production assets are served by Nginx from a multi-stage Docker image.

**Tech Stack:** Node.js 22+, pnpm 11, React 19, TypeScript 6, Vite 8, TanStack Router, TanStack Query, Zod, Vitest, Testing Library, MSW, Playwright, ESLint, Prettier, Turborepo, Docker, and Nginx.

## Global Constraints

- Create the repository at `outputs/admin-dashboard-starter`.
- Do not install dependencies or create `node_modules`.
- Do not download packages or access package registries during implementation.
- Do not execute build, test, lint, format, generator, or development-server commands.
- Do not generate `pnpm-lock.yaml` or OpenAPI client output.
- Keep the backend API separate from the frontend repository.
- Keep authentication and authorization as documented integration boundaries until a backend contract exists.
- Do not initialize Git; a copied project should begin with its own history.

---

## File Map

- Root configuration owns workspace orchestration, shared quality commands, editor defaults, and environment examples.
- `apps/admin` owns executable SPA code, routes, layouts, feature examples, public assets, and app-specific test/build configuration.
- `packages/ui` owns reusable presentational primitives and design tokens.
- `packages/api-client` owns HTTP transport, typed errors, and API client construction.
- `packages/config` owns shared TypeScript and Prettier configuration files.
- `packages/types` owns framework-independent domain and pagination types.
- `deploy/nginx` owns the static-server runtime configuration.
- `docs/product`, `docs/architecture`, `docs/decisions`, and `docs/plans` explain scope, durable technical decisions, and next actions.

### Task 1: Workspace Contracts and Tooling Configuration

**Files:**

- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `tsconfig.json`
- Create: `eslint.config.js`
- Create: `prettier.config.mjs`
- Create: `.prettierignore`
- Create: `.editorconfig`
- Create: `.gitignore`
- Create: `.dockerignore`
- Create: `.npmrc`
- Create: `.nvmrc`
- Create: `.env.example`
- Create: `.vscode/extensions.json`
- Create: `.vscode/settings.json`

**Interfaces:**

- Consumes: the global constraints and package versions recorded in the approved design.
- Produces: workspace scripts named `dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`, `format`, `format:check`, and `clean`; the `@starter/*` workspace namespace; Node and pnpm engine constraints.

- [x] **Step 1: Create root workspace manifests**

  Define a private ESM workspace with `packageManager: pnpm@11.15.1`, Node `>=22.12.0`, `apps/*` and `packages/*` workspace globs, and Turborepo task forwarding.

- [x] **Step 2: Create strict shared tool configuration**

  Add TypeScript project references, ESLint flat configuration, Prettier defaults, editor settings, and ignores that exclude generated output without excluding source or documentation.

- [x] **Step 3: Perform static manifest validation**

  Run only local platform checks that parse JSON and inspect YAML/text. Expected: all JSON files parse, workspace globs cover every package, and no dependency directory or lockfile exists.

- [x] **Step 4: Defer Git history creation**

  Do not run `git init` or `git commit`. The README will instruct the user to initialize Git after duplicating and renaming the starter.

### Task 2: Shared Package Boundaries

**Files:**

- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig.base.json`
- Create: `packages/config/tsconfig.react.json`
- Create: `packages/config/prettier.config.mjs`
- Create: `packages/types/package.json`
- Create: `packages/types/tsconfig.json`
- Create: `packages/types/src/index.ts`
- Create: `packages/api-client/package.json`
- Create: `packages/api-client/tsconfig.json`
- Create: `packages/api-client/src/api-error.ts`
- Create: `packages/api-client/src/create-api-client.ts`
- Create: `packages/api-client/src/index.ts`
- Create: `packages/api-client/README.md`
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/button.tsx`
- Create: `packages/ui/src/card.tsx`
- Create: `packages/ui/src/index.ts`
- Create: `packages/ui/src/styles.css`

**Interfaces:**

- Consumes: `@starter/config` TypeScript bases and browser-native `fetch`.
- Produces: `ApiError`, `createApiClient(options)`, `ApiClient.request<T>()`, `PaginationMeta`, `PaginatedResponse<T>`, `Button`, and `Card`.

- [x] **Step 1: Create type-only shared contracts**

  Export stable pagination and identifier types without React or browser dependencies.

- [x] **Step 2: Create HTTP client boundary**

  Normalize non-success responses as `ApiError`, accept an optional `AbortSignal`, default to JSON content negotiation, and expose a generic typed request method.

- [x] **Step 3: Create minimal UI primitives**

  Provide accessible button and card primitives with a small CSS token surface; do not introduce a broad component catalog.

- [x] **Step 4: Check package exports statically**

  Confirm every exported file exists, package names are unique, and all internal dependencies use `workspace:*`.

### Task 3: Admin SPA Skeleton

**Files:**

- Create: `apps/admin/package.json`
- Create: `apps/admin/index.html`
- Create: `apps/admin/tsconfig.json`
- Create: `apps/admin/tsconfig.app.json`
- Create: `apps/admin/tsconfig.node.json`
- Create: `apps/admin/vite.config.ts`
- Create: `apps/admin/vitest.config.ts`
- Create: `apps/admin/playwright.config.ts`
- Create: `apps/admin/.env.example`
- Create: `apps/admin/public/favicon.svg`
- Create: `apps/admin/src/vite-env.d.ts`
- Create: `apps/admin/src/main.tsx`
- Create: `apps/admin/src/app/app.tsx`
- Create: `apps/admin/src/app/providers.tsx`
- Create: `apps/admin/src/app/query-client.ts`
- Create: `apps/admin/src/app/router.tsx`
- Create: `apps/admin/src/app/styles.css`
- Create: `apps/admin/src/layouts/dashboard-layout.tsx`
- Create: `apps/admin/src/pages/dashboard-page.tsx`
- Create: `apps/admin/src/pages/users-page.tsx`
- Create: `apps/admin/src/pages/not-found-page.tsx`
- Create: `apps/admin/src/pages/error-page.tsx`
- Create: `apps/admin/src/features/users/api/list-users.ts`
- Create: `apps/admin/src/features/users/model/user.ts`
- Create: `apps/admin/src/features/users/ui/user-table.tsx`
- Create: `apps/admin/src/shared/config/env.ts`
- Create: `apps/admin/src/shared/lib/api.ts`
- Create: `apps/admin/src/shared/ui/page-header.tsx`
- Create: `apps/admin/src/test/setup.ts`
- Create: `apps/admin/src/test/fixtures/users.ts`
- Create: `apps/admin/src/features/users/ui/user-table.test.tsx`
- Create: `apps/admin/e2e/smoke.spec.ts`

**Interfaces:**

- Consumes: `ApiClient`, `Button`, `Card`, and shared pagination types from workspace packages.
- Produces: routes `/`, `/users`, and a not-found fallback; a query-backed users feature; parsed `VITE_APP_NAME`, `VITE_API_BASE_URL`, and `VITE_ENABLE_MOCKS` configuration.

- [x] **Step 1: Write representative tests before feature source**

  Specify user-table empty and populated states plus an end-to-end dashboard navigation smoke journey. Do not execute the tests before dependencies are intentionally installed later.

- [x] **Step 2: Create Vite and test configuration**

  Configure the React and Tailwind Vite plugins, explicit TanStack route tree, source alias, Vitest browser-like environment, coverage output, and Playwright web-server contract.

- [x] **Step 3: Create application composition root**

  Instantiate one QueryClient, register RouterProvider and QueryClientProvider, parse environment values once, and keep app bootstrap free of feature logic.

- [x] **Step 4: Create route and layout composition**

  Add semantic sidebar/header/main regions, keyboard-visible navigation, pending/error/not-found states, and route-level titles.

- [x] **Step 5: Create dashboard and users example features**

  Render overview cards and a responsive user table. Keep demonstration users behind `listUsers`; do not call `fetch` from React components.

- [x] **Step 6: Create responsive design tokens and styles**

  Establish neutral surfaces, one restrained accent color, readable typography, consistent spacing/radii, focus states, reduced-motion handling, and mobile navigation behavior.

- [x] **Step 7: Inspect imports and route contracts statically**

  Verify import targets exist, package dependencies declare every external import, and browser source does not access `process.env` or direct HTTP outside the API boundary.

### Task 4: Container Runtime and Operational Files

**Files:**

- Create: `Dockerfile`
- Create: `deploy/nginx/default.conf`
- Create: `deploy/nginx/security-headers.conf`
- Create: `compose.example.yaml`

**Interfaces:**

- Consumes: `pnpm build --filter @starter/admin` and `apps/admin/dist`.
- Produces: an Nginx container serving port `8080`, `/health`, SPA fallback, immutable asset caching, and baseline security headers.

- [x] **Step 1: Create multi-stage Dockerfile**

  Separate dependency, build, and Nginx runtime stages; use Corepack and a frozen lockfile for future production builds while documenting the initial lockfile creation step.

- [x] **Step 2: Configure Nginx for a client-side SPA**

  Add `/health`, `try_files` fallback to `index.html`, compression, cache policies, security headers, and non-root-compatible port `8080`.

- [x] **Step 3: Create an example Compose service**

  Document local image construction, read-only filesystem, temporary Nginx runtime filesystems, health checks, and restart policy without starting containers.

- [x] **Step 4: Inspect container contracts statically**

  Confirm copied paths match Vite output and referenced Nginx include files exist.

### Task 5: Documentation, ADRs, and Handoff

**Files:**

- Create: `AGENTS.md`
- Create: `README.md`
- Create: `docs/product/product-scope.md`
- Create: `docs/product/terminology.md`
- Create: `docs/architecture/overview.md`
- Create: `docs/architecture/frontend-architecture.md`
- Create: `docs/architecture/authentication.md`
- Create: `docs/architecture/authorization.md`
- Create: `docs/architecture/api-integration.md`
- Create: `docs/architecture/design-system.md`
- Create: `docs/architecture/testing-strategy.md`
- Create: `docs/architecture/deployment.md`
- Create: `docs/decisions/README.md`
- Create: `docs/decisions/ADR-001-vite-over-nextjs.md`
- Create: `docs/decisions/ADR-002-feature-oriented-architecture.md`
- Create: `docs/decisions/ADR-003-pnpm-workspace.md`
- Create: `docs/decisions/ADR-004-openapi-contract.md`
- Create: `docs/decisions/ADR-005-nginx-static-runtime.md`
- Create: `docs/plans/next-steps.md`
- Create: `docs/plans/project-bootstrap-checklist.md`

**Interfaces:**

- Consumes: every implemented directory, script, environment key, and architectural boundary.
- Produces: one reliable entry point for humans and agents, a duplication checklist, and a sequenced post-scaffold setup guide.

- [x] **Step 1: Write operational agent guidance**

  Define repository commands, architectural invariants, security rules, testing expectations, generated-code policy, and documentation update requirements.

- [x] **Step 2: Write the human README and bootstrap checklist**

  Explain how to open the folder in Cursor, duplicate and rename it, initialize Git, install with pnpm, create the first lockfile, run checks, configure API values, and build a Docker image later.

- [x] **Step 3: Write architecture and product documentation**

  Make boundaries, data flow, authentication assumptions, permission strategy, design-system growth, testing layers, and VPS deployment responsibilities explicit.

- [x] **Step 4: Record architectural decisions**

  Use accepted ADRs with context, decision, consequences, and reconsideration triggers for the five durable decisions.

- [x] **Step 5: Run final static verification**

  Parse JSON, inventory the tree, detect broken relative imports with local inspection, scan for forbidden generated artifacts, and confirm no install/build/test command was executed.

- [x] **Step 6: Hand off without Git initialization**

  Link the completed folder and primary documentation. State explicitly that runtime verification remains pending until the user intentionally installs dependencies.
