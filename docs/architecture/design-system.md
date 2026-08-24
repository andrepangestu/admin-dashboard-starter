# Design System

## Direction

The starter uses a soft, minimal visual language ("Soft Sky"): cool slate neutrals, a friendly ocean-blue action color, a light sidebar that blends with the page, generous 1rem radii, and gentle blue-tinted elevation on cards. Utility labels are small sans-serif; system status stays visible through a quiet pulse in the sidebar footer. Data tables are airy lists: no header band, tall rows with softened hairline separators, and dot-plus-text status instead of pills.

## Layers

1. CSS variables define semantic color, radius, and elevation tokens. They follow the shadcn naming schema (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, …) declared on `:root` (light) and `.dark`, and are exposed as Tailwind utilities via `@theme inline` (ADR-006). Legacy names (`--ink`, `--cobalt`, `--line`, …) alias the new tokens until the CSS using them is migrated.
2. Tailwind CSS 4 supplies composable utility styling for application work.
3. Radix primitives provide tested interaction behavior where native elements are insufficient.
4. shadcn configuration generates app-owned component source under `apps/admin/src/shared/ui`.
5. `packages/ui` contains only stable primitives with proven cross-app value.

## Theming

- Dark mode is class-based: `@custom-variant dark` keyed on `html.dark`. The dark palette mirrors the light identity on deep blue-slate grounds (sky-blue primary); the sidebar is themed per mode (light sky tint in light, deep slate in dark).
- `ThemeProvider` (`apps/admin/src/app/theme-provider.tsx`) owns the light/dark/system preference, persists it to `localStorage` (`admin-ui-theme`), tracks `prefers-color-scheme` while in system mode, and keeps `meta[name="theme-color"]` in sync.
- `public/theme-init.js` applies the stored theme before first paint. It must stay an external file: the production CSP allows only `script-src 'self'`.

## Rules

- Name tokens by purpose, not raw color.
- Use one primary action per local decision area.
- Preserve semantic elements before reaching for ARIA.
- Every interactive control needs keyboard operation and visible focus.
- Provide loading, empty, error, disabled, and permission-denied states.
- Respect reduced motion and keep motion functional.
- Meet WCAG AA contrast for normal text and controls.

## shadcn Workflow

Run the shadcn CLI from `apps/admin` only after dependencies are installed. Generated components begin as app-local source under `src/shared/ui`. Review styling, accessibility, dependencies, and API before promoting a primitive into `packages/ui`.

Known CLI behaviors to check after every `shadcn add`:

- Output may land in a literal `apps/admin/@/` folder instead of `src/shared/ui/`; move the files and delete the folder.
- Verify new dependencies actually land in `package.json` (e.g. `class-variance-authority` was once installed but not declared) and that `pnpm install` reports no ignored build scripts.
- Revert any default `:root`/`.dark` blocks the CLI injects into `styles.css`; the token schema is already defined there.

## Rebranding

Derived projects should replace the favicon, app name, semantic palette, product copy, and domain-specific navigation. Preserve spacing, focus, responsive, and state conventions unless an intentional redesign updates this document.
