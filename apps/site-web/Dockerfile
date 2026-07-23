FROM node:22-alpine AS build
WORKDIR /workspace
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/site-web/package.json apps/site-web/package.json
COPY packages packages
COPY sites sites
RUN pnpm install --frozen-lockfile
COPY apps/site-web apps/site-web
ARG SITE_ID
ARG PUBLIC_SITE_URL
ENV SITE_ID=$SITE_ID PUBLIC_SITE_URL=$PUBLIC_SITE_URL ENFORCE_PRODUCTION_GATES=true
RUN pnpm --filter @base-cms/site-web build

FROM nginx:alpine AS runtime
COPY --from=build /workspace/apps/site-web/dist /usr/share/nginx/html
