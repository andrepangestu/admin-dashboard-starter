# Authorization

## Principle

The backend is authoritative. Frontend checks decide what to display and which actions to offer; the backend decides whether an operation is allowed.

## Permission Model

Prefer capability strings such as:

```text
users.read
users.invite
users.suspend
reports.export
```

Roles group capabilities on the backend. UI code should ask whether a capability exists rather than hard-code role names throughout components.

## UI Behavior

- Hide navigation for areas the user cannot access.
- Disable an action only when explaining why is useful; otherwise omit it.
- Handle `403` even when the action was previously visible because permissions can change.
- Render a distinct unauthorized state rather than a generic error.
- Do not expose sensitive data in preloaded markup or caches merely because it is hidden visually.

## Testing

Each sensitive feature needs tests for allowed, denied, and permission-changed-during-session paths. End-to-end coverage must prove the backend rejects forbidden operations when the test environment supports real authorization.
