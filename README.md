# Admin Dashboard Starter

A reusable foundation for internal admin applications with a separate backend API and VPS/Docker deployment.

> Scaffold status: dependencies are installed with a reviewed `pnpm-lock.yaml`, and the full quality gate passes (format, lint, typecheck, unit tests, production build, and Playwright smoke tests). There is still no Git history: initialize Git when you duplicate this starter into a real project.

## Stack

- React 19, TypeScript strict mode, and Vite 8.
- TanStack Router for type-safe client routing.
- TanStack Query for remote/server state.
- Tailwind CSS 4, Radix primitives, and a shadcn-compatible app configuration.
- Zod for runtime environment and boundary validation.
- pnpm workspace with Turborepo task orchestration.
- Vitest, Testing Library, MSW-ready dependencies, and Playwright.
- Nginx static runtime in a multi-stage Docker image.
- OpenAPI generation prepared with Hey API.

Package versions are a reviewed snapshot, not a promise to always track `latest`. Dependabot is configured to propose updates after the repository is placed on GitHub.

## Open in Cursor

Open this folder directly:

```text
admin-dashboard-starter/
```

In Cursor, choose **File → Open Folder**, select the folder, and review `AGENTS.md`, this README, and `docs/` before installing anything.

## Duplicate for a New Project

Copy the entire folder, rename the copy, then update at least:

1. Root `package.json`: `name`.
2. `apps/admin/package.json`: package name if the workspace namespace changes.
3. `.env.example` and `apps/admin/.env.example`: product name and backend URL.
4. `apps/admin/index.html`: title and description.
5. `apps/admin/public/favicon.svg`: project identity.
6. Product scope, terminology, and ADR context under `docs/`.
7. Docker image and Compose service names.

The starter has no `.git` directory. Initialize Git inside the renamed copy so every project starts with independent history.

## Repository Map

```text
.
├── apps/
│   └── admin/                 # React + Vite SPA
├── packages/
│   ├── api-client/            # HTTP and OpenAPI boundary
│   ├── config/                # Shared static configuration
│   ├── types/                 # Framework-independent types
│   └── ui/                    # Stable shared UI primitives
├── deploy/nginx/              # Static runtime configuration
├── docs/
│   ├── architecture/          # Technical source of truth
│   ├── decisions/             # ADRs
│   ├── plans/                 # Bootstrap and next actions
│   └── product/               # Product scope and vocabulary
├── AGENTS.md                  # Rules for developers and coding agents
├── CLAUDE.md                  # Working notes for Claude Code (AGENTS.md stays authoritative)
├── Dockerfile
├── pnpm-workspace.yaml
└── turbo.json
```

## First Intentional Setup

Requirements:

- Node.js 22.12 or newer.
- Corepack enabled.
- pnpm 11.15.1.

After reviewing the files:

```bash
corepack enable
corepack prepare pnpm@11.15.1 --activate
pnpm install
cp apps/admin/.env.example apps/admin/.env
pnpm typecheck
pnpm lint
pnpm test
pnpm dev
```

The reviewed `pnpm-lock.yaml` is part of the starter. Keep it committed so CI and Docker builds stay reproducible, and do not use npm or Yarn in this repository.

For browser journeys, install the Playwright browser once, then run the suite:

```bash
pnpm --filter @starter/admin exec playwright install chromium
pnpm test:e2e
```

pnpm 11 blocks dependency postinstall scripts by default. Allow/deny decisions are recorded in the `allowBuilds` section of `pnpm-workspace.yaml` (`msw` is deliberately `false`; its script only prepares optional Service Worker assets). A new dependency that ships a build script needs an entry there, or every pnpm command fails with a pending-builds error.

## Environment

| Variable            | Purpose                          | Example                               |
| ------------------- | -------------------------------- | ------------------------------------- |
| `VITE_APP_NAME`     | Visible product name             | `Admin Workspace`                     |
| `VITE_API_BASE_URL` | Absolute backend API base URL    | `http://localhost:3000/api`           |
| `VITE_ENABLE_MOCKS` | Use isolated demonstration users | `true` locally, `false` in production |

Vite values are compiled into browser assets. They are not secrets. Never place credentials, private keys, or server-only configuration in a `VITE_` variable.

## Commands

| Command             | Purpose                                |
| ------------------- | -------------------------------------- |
| `pnpm dev`          | Start the admin development server     |
| `pnpm build`        | Typecheck and create production assets |
| `pnpm typecheck`    | Run strict TypeScript checks           |
| `pnpm lint`         | Run ESLint                             |
| `pnpm test`         | Run unit and component tests           |
| `pnpm test:e2e`     | Run Playwright browser journeys        |
| `pnpm format`       | Rewrite files with Prettier            |
| `pnpm format:check` | Check formatting without changes       |

## API Contract

Replace `packages/api-client/openapi/backend.openapi.yaml` with the authoritative backend specification. Then run:

```bash
pnpm --filter @starter/api-client generate
```

Generated code is replaceable output. Keep feature-facing adapters handwritten so a generator change does not spread through the application.

## Docker

Docker builds use the reviewed `pnpm-lock.yaml` at the repository root:

```bash
docker build \
  --build-arg VITE_APP_NAME="Admin Workspace" \
  --build-arg VITE_API_BASE_URL="https://api.example.com" \
  --build-arg VITE_ENABLE_MOCKS=false \
  -t admin-dashboard .

docker run --rm -p 8080:8080 admin-dashboard
```

The image serves `/health` on port `8080`. Put TLS, domain routing, rate limits, and request logging at the VPS reverse proxy or ingress layer.

## Documentation

- [Architecture overview](docs/architecture/overview.md)
- [Frontend architecture](docs/architecture/frontend-architecture.md)
- [Authentication](docs/architecture/authentication.md)
- [Authorization](docs/architecture/authorization.md)
- [API integration](docs/architecture/api-integration.md)
- [Design system](docs/architecture/design-system.md)
- [Testing strategy](docs/architecture/testing-strategy.md)
- [Deployment](docs/architecture/deployment.md)
- [Architecture decisions](docs/decisions/README.md)
- [Project bootstrap checklist](docs/plans/project-bootstrap-checklist.md)
- [Next steps](docs/plans/next-steps.md)

## Important Boundary

Authentication and permissions are integration points, not completed production features. Final behavior must be designed with the actual backend cookie/session, CSRF, CORS, refresh, and permission contract.
