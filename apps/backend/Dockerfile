FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/package.json

RUN npm ci --workspace=apps/backend

COPY apps/backend apps/backend

WORKDIR /app/apps/backend
RUN npx prisma generate && npm run build

FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/package.json

RUN npm ci --omit=dev --workspace=apps/backend

COPY --from=builder /app/apps/backend/dist apps/backend/dist
COPY --from=builder /app/apps/backend/generated apps/backend/generated
COPY --from=builder /app/apps/backend/prisma apps/backend/prisma
COPY --from=builder /app/apps/backend/prisma.config.ts apps/backend/prisma.config.ts

WORKDIR /app/apps/backend
EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm run start:prod"]
