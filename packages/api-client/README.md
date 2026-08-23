# `@starter/api-client`

This package owns browser-to-API transport concerns. UI code must consume feature query functions rather than call `fetch` directly.

The handwritten client is intentionally small. Replace `openapi/backend.openapi.yaml` with the authoritative backend contract, then run `pnpm --filter @starter/api-client generate`. The generated output belongs under `src/generated/`; expose it through a handwritten adapter and never edit generated files manually.

Authentication defaults to `credentials: include` so a backend can use secure HTTP-only cookies. Finalize cookie, CSRF, refresh, and CORS behavior with the backend team before production use.
