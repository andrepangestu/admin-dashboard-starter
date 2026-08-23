# Recommended Next Steps

## Phase 1: Validate the Scaffold

Install dependencies intentionally, create the lockfile, and run the complete quality suite. Resolve dependency or configuration incompatibilities before adding business code. Open the SPA with demonstration data and inspect desktop/mobile layouts plus keyboard navigation.

## Phase 2: Establish Backend Contracts

Replace the OpenAPI stub, generate bindings, and agree on session/CORS/CSRF behavior. Add a session query and protected route boundary only after these decisions are written down.

## Phase 3: Model Permissions

Receive effective capabilities from the session endpoint, create one permission-checking interface, and test allowed, denied, and changed-session paths. Keep backend enforcement authoritative.

## Phase 4: Build the First Real Feature

Choose one representative vertical slice. Implement its route, validated search parameters, query options, API adapter, UI states, component tests, MSW scenarios, and one Playwright journey. Use this slice to refine conventions before broad expansion.

## Phase 5: Production Readiness

Configure monitoring, redact sensitive telemetry, tighten CSP, build and scan the image, deploy to a non-production VPS, exercise health/smoke/rollback procedures, and record the final deployment runbook.

## Phase 6: Extract the Reusable Template

After at least one real project succeeds, back-port only proven generic improvements into a clean starter release. Do not copy business-specific permissions, endpoints, branding, or analytics assumptions into the reusable base.
