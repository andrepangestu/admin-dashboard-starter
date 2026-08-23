# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` is the authoritative rules file for this repository — read it before changing code. This file adds the practical knowledge needed to work here efficiently without re-deriving it.

## What this is

A pnpm + Turborepo workspace containing a client-side React 19 admin SPA (`apps/admin`: Vite, TanStack Router/Query, Tailwind CSS 4, strict TypeScript). It is a **starter template**: there is intentionally no Git history, and `pnpm-lock.yaml` is created by the first `pnpm install`. The backend API is a separate repository — this repo must never grow server code or SSR.

## Commands

Requires Node >= 22.12 and pnpm 11 (via corepack). Run everything from the repo root; Turborepo fans out per package.

```bash
pnpm install                      # first run creates pnpm-lock.yaml
cp apps/admin/.env.example apps/admin/.env   # required before dev
pnpm dev                          # Vite dev server on :5173
pnpm typecheck && pnpm lint && pnpm test && pnpm build
pnpm format                       # Prettier writes; CI runs format:check first
pnpm test:e2e                     # Playwright; starts its own dev server
```

- Single package: `pnpm --filter @starter/admin test`
- Single test file: `pnpm --filter @starter/admin test src/features/users/ui/user-table.test.tsx`
- Watch mode: `pnpm --filter @starter/admin test:watch`
- Playwright browsers (once): `pnpm --filter @starter/admin exec playwright install chromium`
- OpenAPI codegen: `pnpm --filter @starter/api-client generate` (only after replacing the placeholder `packages/api-client/openapi/backend.openapi.yaml`)

## Architecture

Data flow for a feature (users is the reference example):

```
pages/users-page.tsx        → useQuery + composes feature UI; no business logic
features/users/api/*.ts     → the ONLY layer that talks to the API client
features/users/model/*.ts   → feature types (built on @starter/types)
features/users/ui/*.tsx     → presentational components + colocated tests
shared/lib/api.ts           → the single ApiClient instance
shared/config/env.ts        → the ONLY place import.meta.env is read (Zod-validated at startup)
```

- UI components never call `fetch`. `createApiClient` (`@starter/api-client`) normalizes failures into `ApiError` and sends cookies (`credentials: 'include'`).
- Routing is a code-defined tree in `apps/admin/src/app/router.tsx` (no file-based routing). Add a route there and give it a page component that composes `features/`.
- `VITE_ENABLE_MOCKS=true` serves in-memory demo data from feature API modules (see `listUsers`); no MSW worker is wired up yet.
- Styling is handwritten semantic CSS in `apps/admin/src/app/styles.css` on top of Tailwind 4 (`@tailwindcss/vite`, no tailwind.config file). `@starter/ui` primitives (Button, Card) ship their own `styles.css`, imported from the app stylesheet.
- shadcn-generated components go to `apps/admin/src/shared/ui` first (aliases in `components.json`); promote to `packages/ui` only with multiple real consumers.
- Workspace packages export TS source directly from `src/` (no build step); import only from declared `@starter/*` exports, never deep paths.
- Shared dependency versions (react, typescript, @types/*) live in the `catalog:` section of `pnpm-workspace.yaml` and are referenced as `"catalog:"` in package.json files.

## Gotchas

- TypeScript 6: `baseUrl` is a hard error (TS5101). The `@/*` alias works through `paths` alone in `apps/admin/tsconfig.app.json`; keep it in sync with `resolve.alias` in both `vite.config.ts` and `vitest.config.ts`.
- Vitest `include` is restricted to `src/**` in `apps/admin/vitest.config.ts`. Playwright specs live in `apps/admin/e2e/` — if Vitest ever picks them up, the suite fails with "Playwright Test did not expect test() to be called here".
- `apps/admin/e2e/` is type-covered by `tsconfig.node.json` (`include`). New e2e files outside covered paths break typed linting with "was not found by the project service".
- pnpm 11 blocks dependency postinstall scripts. Decisions are recorded in `allowBuilds` in `pnpm-workspace.yaml` (`msw: false` deliberately — its script only prepares optional Service Worker assets). A new dep with a build script will fail every `pnpm` command until an entry is added there.
- ESLint runs with `--max-warnings=0` and typed linting (`projectService`); `verbatimModuleSyntax` + `consistent-type-imports` means type-only imports must use `import type`.
- CI order is format:check → lint → typecheck → test → build; unformatted files fail CI before anything else runs.

## Non-negotiables (from AGENTS.md)

- Write tests before implementing behavior; cover success, empty, error, and permission-sensitive states.
- Never edit `packages/api-client/src/generated/` by hand.
- No `any`, unchecked casts, or blanket lint suppressions.
- Never store auth tokens in `localStorage`; never log secrets or personal data.
- Validate untrusted runtime data at boundaries (Zod), not just with types.
- Preserve keyboard access, semantic HTML, visible focus, reduced-motion, and responsive behavior.
- Architecture changes need an ADR in `docs/decisions/`; keep docs current when behavior, commands, or env values change.
