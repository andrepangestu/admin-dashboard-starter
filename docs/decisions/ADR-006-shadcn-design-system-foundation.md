# ADR-006: Adopt the shadcn Token Schema and Component Substrate

- Status: Accepted
- Date: 2026-08-24

## Context

The starter shipped with a handwritten semantic stylesheet whose tokens (`--ink`, `--cobalt`, `--line`) were raw CSS custom properties invisible to Tailwind, a hand-duplicated `--ui-*` token copy in `packages/ui`, no dark mode, and a shadcn configuration (`components.json`, `cn()`, Radix slot) that was never exercised. The 2026 ecosystem has consolidated on shadcn/ui as the component substrate for React admin surfaces; the most popular open-source admin template (satnaing/shadcn-admin) shares this repo's exact stack (Vite, React 19, TanStack Router, Tailwind 4).

## Decision

- Rename the app's design tokens to the shadcn schema (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, …) defined on `:root`/`.dark` and exposed as Tailwind utilities through `@theme inline`. Legacy names remain as aliases until the CSS that uses them is retired.
- Keep the existing visual identity: the palette values, monospace utility labels, oversized headings, navy sidebar (constant across themes), and the handwritten responsive shell are preserved. shadcn replaces the component substrate, not the look. The shadcn `Sidebar` component is deliberately not used.
- Add class-based dark mode (`@custom-variant dark`) with a dark palette derived from the identity colors, a `ThemeProvider` (light/dark/system, persisted to `localStorage`), and a pre-paint bootstrap script kept external (`public/theme-init.js`) because the production CSP forbids inline scripts.
- Generate shadcn components into `apps/admin/src/shared/ui` as consumers need them. `packages/ui` stops shipping styled primitives (its `--ui-*` namespace is retired) and remains the promotion target for primitives with proven cross-app value.
- Colors stay hex/`color-mix()` rather than OKLCH so identity values remain byte-identical and diffs reviewable.

## Consequences

- Tailwind utilities and shadcn-generated components can style against the same tokens the legacy semantic CSS uses; both systems coexist during incremental migration with no class-name collisions.
- Every surface must be checked in both themes; WCAG AA contrast applies to the dark palette too.
- `eslint` needs a scoped exception for generated `shared/ui` files that export `cva` variants next to components (`react-refresh/only-export-components` + `--max-warnings=0`).
- New Radix/shadcn dependencies must be watched for pnpm build-script and peer-dependency policy failures at install time.

## Reconsider When

The app moves to a design system owned outside this repo, or shadcn's token contract changes incompatibly in a future major version.

## Amendment — 2026-08-24

The "keep the existing visual identity" clause is superseded by a product decision: after reviewing the migrated UI, the owner rejected the navy/cobalt console identity (dark sidebar, monospace utility labels, oversized headings). The palette and identity CSS were replaced with a soft minimal direction ("Soft Sky": light blended sidebar, ocean-blue primary, cool slate neutrals, 1rem radii, soft elevation) chosen from screenshot prototypes. Everything structural in this ADR — the shadcn token schema, `@theme inline` exposure, class-based dark mode, external theme bootstrap, component placement, and hex-over-OKLCH — is unchanged; only token values and the identity-specific rules moved.
