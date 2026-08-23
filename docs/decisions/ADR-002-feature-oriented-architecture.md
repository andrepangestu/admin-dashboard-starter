# ADR-002: Organize Product Code by Feature

- Status: Accepted
- Date: 2026-08-03

## Context

Technical-layer folders become difficult to change as an admin product accumulates unrelated workflows. A reusable starter also needs boundaries that coding agents and new contributors can understand without loading the entire application.

## Decision

Organize business code under `features/<feature>/{api,model,ui}`. Pages compose features, app bootstrap composes global providers, and shared code requires multiple consumers.

## Consequences

- Files that change together remain close.
- Features can be tested and reviewed in isolation.
- Some low-level patterns may initially repeat before a stable abstraction emerges.
- Cross-feature imports need active review to prevent hidden coupling.

## Reconsider When

A feature grows into an independently deployable application or domain package with a stable public API.
