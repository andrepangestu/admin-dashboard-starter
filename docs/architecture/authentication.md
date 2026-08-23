# Authentication

## Status

Authentication is an integration boundary. The starter intentionally does not invent a production session protocol.

## Recommended Contract

- The backend establishes a secure, HTTP-only, same-site cookie.
- Browser requests use `credentials: include`.
- The backend exposes a session endpoint returning the current user and effective permissions.
- Logout invalidates the server session and clears the cookie.
- State-changing requests use CSRF protection when the cookie and deployment topology require it.
- CORS allows only explicit trusted frontend origins and credentials.

## Application Flow

1. Bootstrap requests the current session.
2. A loading shell prevents protected content from flashing.
3. An authenticated result populates session query data.
4. An unauthenticated result redirects to the agreed login entry point.
5. A session expiry clears cached protected data and returns to login without looping.

## Prohibited Defaults

- Do not store bearer or refresh tokens in `localStorage`.
- Do not treat the presence of a client-side token as proof of authorization.
- Do not log cookies, tokens, or full session payloads.
- Do not implement refresh behavior until the backend defines rotation and replay handling.

## Decisions Required per Project

Document login ownership, cookie domain/path/same-site settings, CSRF strategy, session refresh/expiry, multi-tab behavior, impersonation controls, and audit requirements before implementing authentication.
