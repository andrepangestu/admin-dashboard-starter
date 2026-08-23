# Testing Strategy

## Layers

### Unit Tests

Use Vitest for pure models, schemas, environment parsing helpers, query-key factories, and API normalization. Keep tests deterministic and avoid mocking the function under test.

### Component Tests

Use Testing Library to exercise components through accessible roles and user-visible text. Test behavior rather than class names or internal state.

### API Boundary Tests

Use MSW to represent backend success, empty, validation, unauthorized, forbidden, and server-error responses. Do not mock TanStack Query itself.

### End-to-End Tests

Use Playwright for a small set of critical journeys: session entry, primary navigation, one high-value read flow, one sensitive mutation, and recovery from session expiry.

## Test Ownership

Keep focused tests next to the source they protect. Shared fixtures belong under `src/test` only when several suites use them. Avoid large global fixture objects that hide each test's intent.

## Quality Gates

Pull requests must pass formatting, lint, strict typecheck, unit/component tests, production build, and critical Playwright tests. Coverage reports inform gaps but do not replace behavior-focused review.

## Current Scaffold Limitation

The initial scaffold was created without installing dependencies, so its example tests were not executed during generation. Run the complete quality suite immediately after the first intentional `pnpm install` and resolve any ecosystem-version incompatibility before feature work.
