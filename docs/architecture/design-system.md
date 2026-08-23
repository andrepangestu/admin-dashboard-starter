# Design System

## Direction

The starter uses an operations-workspace visual language: quiet ink surfaces, cobalt action color, monospaced utility labels, and a status rail that makes system condition visible without dominating the work.

## Layers

1. CSS variables define semantic color, radius, and elevation tokens.
2. Tailwind CSS 4 supplies composable utility styling for application work.
3. Radix primitives provide tested interaction behavior where native elements are insufficient.
4. shadcn configuration generates app-owned component source under `apps/admin/src/shared/ui`.
5. `packages/ui` contains only stable primitives with proven cross-app value.

## Rules

- Name tokens by purpose, not raw color.
- Use one primary action per local decision area.
- Preserve semantic elements before reaching for ARIA.
- Every interactive control needs keyboard operation and visible focus.
- Provide loading, empty, error, disabled, and permission-denied states.
- Respect reduced motion and keep motion functional.
- Meet WCAG AA contrast for normal text and controls.

## shadcn Workflow

Run the shadcn CLI from `apps/admin` only after dependencies are installed. Generated components begin as app-local source. Review styling, accessibility, dependencies, and API before promoting a primitive into `packages/ui`.

## Rebranding

Derived projects should replace the favicon, app name, semantic palette, product copy, and domain-specific navigation. Preserve spacing, focus, responsive, and state conventions unless an intentional redesign updates this document.
