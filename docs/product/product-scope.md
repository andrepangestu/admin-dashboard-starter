# Product Scope

## Purpose

This repository is a reusable starting point for authenticated internal admin applications. It optimizes for operational work: reviewing state, managing records, handling permissions, and completing auditable actions against a separate backend API.

## Intended Users

- Operations teams managing day-to-day records.
- Administrators controlling access and configuration.
- Analysts reviewing status and reports.
- Engineers creating a new admin project from a consistent foundation.

## Included in the Starter

- Application shell, responsive navigation, route states, and example overview/users pages.
- Remote-state and API-client boundaries.
- Design-system foundation and accessible primitives.
- Testing, CI, container, documentation, and dependency-update configuration.
- Demonstration data isolated behind a runtime flag.

## Outside the Starter

- Business-specific workflows and domain models.
- Backend endpoints, databases, queues, and server-side rendering.
- A production-ready login/session implementation without a backend contract.
- A universal role model that guesses project-specific permissions.
- Observability vendor integration, analytics tracking, or notification delivery.

## Success Criteria for a Derived Project

A derived project replaces example identity and data, connects an authoritative OpenAPI contract, defines real authentication and authorization behavior, adds domain features in isolated slices, passes the full quality suite, and ships immutable static assets through the documented container path.
