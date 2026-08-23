# ADR-005: Serve Production Assets with Nginx

- Status: Accepted
- Date: 2026-08-03

## Context

The Vite application produces static files and the target environment is a Docker-enabled VPS. A Node server would add runtime dependencies without serving dynamic frontend behavior.

## Decision

Use a multi-stage image and serve only final assets with unprivileged Nginx on port `8080`. Configure SPA fallback, health checking, compression, cache control, and baseline security headers in the image.

## Consequences

- Runtime resource usage and attack surface remain small.
- Build-time environment values require rebuilding the image.
- The VPS reverse proxy remains responsible for TLS and external routing.
- CSP and cache behavior need review when new asset or API origins are introduced.

## Reconsider When

The frontend gains a genuine server runtime requirement or moves entirely to managed static hosting/CDN infrastructure.
