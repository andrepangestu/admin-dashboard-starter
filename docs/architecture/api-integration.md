# API Integration

## Contract Source

The backend OpenAPI document is the source of truth. Replace the empty valid contract at `packages/api-client/openapi/backend.openapi.yaml` before generating code.

## Generation Boundary

```text
OpenAPI document
  → Hey API generator
  → src/generated (replaceable)
  → handwritten feature adapter
  → TanStack Query
  → UI
```

Generated code must not become the application's domain language. Feature adapters translate generated transport names, normalize errors, and select the data shape consumed by UI code.

## HTTP Rules

- Use one absolute `VITE_API_BASE_URL` parsed at startup.
- Send credentials according to the authentication contract.
- Propagate `AbortSignal` from TanStack Query to requests.
- Use JSON by default while allowing FormData for uploads.
- Preserve request IDs from error responses for support and observability.
- Define retry behavior at the query/mutation layer, not inside every component.

## Schema Changes

Regenerate after every approved backend contract change, inspect the diff, run typecheck and tests, then update affected adapters. Breaking contract changes require coordinated backend/frontend rollout or a compatible transition period.

## Demonstration Data

`VITE_ENABLE_MOCKS=true` activates isolated sample users for starter exploration. Production builds must set it to `false`. Prefer MSW for realistic development/test mocking once feature contracts exist.
