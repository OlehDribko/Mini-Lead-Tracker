FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm ci --workspace=apps/frontend

FROM node:22-alpine AS builder

WORKDIR /app
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY package.json package-lock.json ./
COPY apps/frontend apps/frontend

WORKDIR /app/apps/frontend
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json
RUN npm ci --omit=dev --workspace=apps/frontend

COPY --from=builder /app/apps/frontend/.next apps/frontend/.next
COPY --from=builder /app/apps/frontend/public apps/frontend/public
COPY --from=builder /app/apps/frontend/next.config.ts apps/frontend/next.config.ts

WORKDIR /app/apps/frontend
EXPOSE 3000

CMD ["npm", "run", "start"]
