# Frontend Architecture

## Composition Root

`src/main.tsx` mounts the application. `src/app/` creates global providers, one QueryClient, and the router. No product feature logic belongs in bootstrap files.

## Feature-Oriented Layout

```text
features/<feature>/
├── api/       # HTTP adapters and query options
├── model/     # Types, schemas, and pure domain helpers
└── ui/        # Feature-owned components
```

Pages import feature public APIs and arrange route-level layouts. Features must not import pages. Shared app code requires more than one consumer; otherwise it remains in the owning feature.

## Routing

The starter uses an explicit code-defined TanStack route tree. This keeps the initial repository inspectable without running a generator. Route search parameters should be validated, and data preloading may be introduced per route when it materially improves navigation.

## Remote Data

Query keys are stable arrays beginning with the feature name. Query functions accept cancellation signals. Mutations invalidate or update only related keys. Avoid copying query results into component state.

## Forms

Use native semantics and Zod schemas at first. If forms become complex, standardize on one form library in a new ADR rather than mixing patterns.

## Error and Empty States

- Environment errors fail during bootstrap with a precise message.
- Route crashes use the router error component and offer recovery.
- Expected empty collections render an instructional empty state.
- API errors distinguish session/permission problems from transient network failures when the backend contract supports it.

## Naming

Use nouns for components, verbs for actions, and domain language from `docs/product/terminology.md`. Avoid generic folders such as `helpers/` or `misc/`.
