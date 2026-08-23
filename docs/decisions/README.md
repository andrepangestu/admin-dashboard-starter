# Architecture Decision Records

ADRs preserve why durable choices were made. They are not tutorials and should not be silently rewritten when a decision changes.

| ADR                                                 | Decision                                    | Status   |
| --------------------------------------------------- | ------------------------------------------- | -------- |
| [ADR-001](ADR-001-vite-over-nextjs.md)              | Use Vite SPA rather than Next.js by default | Accepted |
| [ADR-002](ADR-002-feature-oriented-architecture.md) | Organize product code by feature            | Accepted |
| [ADR-003](ADR-003-pnpm-workspace.md)                | Use a lightweight pnpm workspace            | Accepted |
| [ADR-004](ADR-004-openapi-contract.md)              | Generate transport bindings from OpenAPI    | Accepted |
| [ADR-005](ADR-005-nginx-static-runtime.md)          | Serve production assets with Nginx          | Accepted |

New ADRs use the next sequence number and contain status, date, context, decision, consequences, and reconsideration triggers. Superseded records remain in the repository and link to their replacement.
