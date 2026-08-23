# Project Bootstrap Checklist

## Identity

- [ ] Duplicate the starter and rename the folder.
- [ ] Change root and app package names.
- [ ] Replace app title, description, favicon, and visible navigation copy.
- [ ] Rewrite product scope and terminology for the real domain.
- [ ] Initialize a new Git repository and configure its remote.

## Toolchain

- [ ] Confirm Node.js 22.12+ and pnpm 11.15.1.
- [ ] Run the first intentional `pnpm install`.
- [ ] Review and commit `pnpm-lock.yaml`.
- [ ] Run format check, lint, typecheck, tests, and build.
- [ ] Enable repository branch protection after CI is green.

## Backend Contract

- [ ] Replace the empty OpenAPI document with the authoritative contract.
- [ ] Generate the API bindings and review the output.
- [ ] Define authentication cookie, CORS, CSRF, refresh, and logout behavior.
- [ ] Define permission capability names and forbidden-state UX.
- [ ] Set production and non-production API base URLs.

## Product Foundation

- [ ] Remove or replace demonstration users.
- [ ] Define initial route map and navigation visibility rules.
- [ ] Create the first real feature with success, loading, empty, error, and denied states.
- [ ] Rebrand design tokens while preserving accessibility.
- [ ] Add real MSW handlers and critical Playwright journeys.

## Operations

- [ ] Choose container registry and immutable tag policy.
- [ ] Configure VPS reverse proxy, TLS, firewall, and logs.
- [ ] Tighten Content Security Policy to known production origins.
- [ ] Configure error monitoring without exposing personal or secret data.
- [ ] Document deploy, smoke test, rollback, backup, and incident ownership.
