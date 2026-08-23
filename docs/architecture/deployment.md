# Deployment

## Artifact

The deployable unit is an immutable container containing only Nginx configuration and Vite static assets. Node.js is used during build stages, not in the runtime image.

## Build Inputs

- Reviewed `pnpm-lock.yaml`.
- Source commit identifier.
- Public Vite build arguments: app name, API base URL, and mock flag.

Vite variables are compiled into JavaScript. Changing them requires a new image build. They must never contain secrets.

## VPS Topology

```text
Internet
  → host reverse proxy / firewall / TLS
  → frontend container :8080
  → separate backend API service
```

The host or ingress owns TLS certificates, domain routing, rate limits, access logs, and upstream timeouts. The frontend container owns static caching, SPA fallback, compression, security headers, and `/health`.

## Release Process

1. Run the full quality suite against the exact commit.
2. Build and tag the image with an immutable version or commit hash.
3. Scan the image and publish it to the selected registry.
4. Deploy with `VITE_ENABLE_MOCKS=false` and the production API URL.
5. Wait for the health check and perform a browser smoke test.
6. Retain the previous known-good image for rollback.

## Security and Reliability

- Run the unprivileged Nginx image on port `8080`.
- Keep the filesystem read-only and use temporary filesystems for Nginx runtime paths.
- Pin images to reviewed versions or digests in production.
- Rebuild regularly for base-image security fixes.
- Tune Content Security Policy to the real API and asset origins before launch.

## Rollback

Rollback means redeploying the previous immutable frontend image. Coordinate with backend compatibility so at least one previous frontend version remains usable during API transitions.
