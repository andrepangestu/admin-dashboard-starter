# ADR-004: Generate Transport Bindings from OpenAPI

- Status: Accepted
- Date: 2026-08-03

## Context

Handwritten request and response types drift from a separately maintained backend. Directly exposing generator output throughout UI code creates a different form of coupling and makes generator changes expensive.

## Decision

Treat the backend OpenAPI document as the transport source of truth. Use Hey API to generate replaceable bindings under `packages/api-client/src/generated`, then expose handwritten feature adapters to the app.

## Consequences

- Contract drift becomes visible during generation and typecheck.
- Generated changes are reviewable and reproducible.
- Backend contract quality directly affects frontend types.
- Adapters add a small amount of code but insulate product UI from transport naming.

## Reconsider When

The backend adopts another authoritative schema technology or cannot supply a reliable machine-readable contract.
