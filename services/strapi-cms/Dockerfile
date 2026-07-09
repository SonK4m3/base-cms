FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN corepack enable && pnpm install --frozen-lockfile=false

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 1337
CMD ["pnpm", "start"]

