# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS dependencies
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /workspace

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json .npmrc ./
COPY apps/admin/package.json apps/admin/package.json
COPY packages/api-client/package.json packages/api-client/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dependencies AS build
ARG VITE_APP_NAME="Admin Workspace"
ARG VITE_API_BASE_URL=http://localhost:3000/api
ARG VITE_ENABLE_MOCKS=false
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS
COPY . .
RUN pnpm --filter @starter/admin build

FROM nginxinc/nginx-unprivileged:1.31-alpine AS runtime
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/conf.d/security-headers.conf
COPY --from=build /workspace/apps/admin/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health || exit 1
