# ADR-001: Use Vite Instead of Next.js by Default

- Status: Accepted
- Date: 2026-08-03

## Context

The application is an authenticated internal dashboard, has a separate backend API, does not require SEO, and will run as a Dockerized frontend on a VPS. A server-rendered React framework would add a Node runtime, server/client boundaries, and deployment coupling without a current product requirement.

## Decision

Use React with Vite as a client-side SPA. Generate static assets and deploy them independently from the backend.

## Consequences

- The production runtime is small and portable.
- Routing, data loading, and authentication bootstrap happen in the browser.
- Public SEO pages should live in a separate surface if later required.
- Initial loading performance must be managed through code splitting, caching, and disciplined dependencies.

## Reconsider When

The product requires public indexable pages, streaming SSR, server-only UI logic, edge rendering, or a single full-stack deployment boundary.
