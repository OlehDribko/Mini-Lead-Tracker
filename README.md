# Mini Lead Tracker

Fullstack test assignment monorepo with:

- `apps/backend` - NestJS + Prisma + PostgreSQL
- `apps/frontend` - Next.js (App Router) + Tailwind

## Monorepo Structure

```text
.
├── apps/
│   ├── backend/
│   └── frontend/
├── docker-compose.yml
└── package.json
```

## Requirements

- Node.js 22+
- npm 10+
- Docker + Docker Compose (for containerized run)

## Environment Files

### Backend

Copy:

```bash
cp apps/backend/.env.example apps/backend/.env
```

`apps/backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mini_lead_tracker?schema=public"
```

### Frontend

Copy:

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

`apps/frontend/.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Local Development (Without Docker for apps)

1) Install dependencies:

```bash
npm install
```

2) Start PostgreSQL only:

```bash
docker compose up -d postgres
```

3) Apply migrations:

```bash
cd apps/backend && npx prisma migrate deploy
```

4) Optional: seed development data:

```bash
cd apps/backend && npm run db:seed
```

5) Run backend (port 3000):

```bash
npm run dev:backend
```

6) Run frontend (port 3001 by default):

```bash
npm run dev:frontend
```

7) Open:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api
- Swagger: http://localhost:3000/api/docs

## Docker (Full Stack)

Run everything:

```bash
docker compose up --build
```

Services:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api
- Swagger: http://localhost:3000/api/docs
- PostgreSQL: localhost:5432

## Backend API Overview

Base URL: `http://localhost:3000/api`

### Leads

- `POST /leads`
- `GET /leads`
- `GET /leads/:id`
- `PATCH /leads/:id`
- `DELETE /leads/:id`

`GET /leads` query params:

- `page`
- `limit`
- `status`
- `q`
- `sort` (`createdAt` | `updatedAt`)
- `order` (`asc` | `desc`)

### Comments

- `GET /leads/:id/comments`
- `POST /leads/:id/comments`

## API Verification Examples

Use these commands after backend is running on `http://localhost:3000`.

List leads:

```bash
curl "http://localhost:3000/api/leads?page=1&limit=10&sort=createdAt&order=desc"
```

Create lead:

```bash
curl -X POST "http://localhost:3000/api/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@company.com",
    "company": "Test Company",
    "status": "NEW",
    "value": 2500,
    "notes": "Created from README verification step"
  }'
```

Add comment (replace `<lead-id>`):

```bash
curl -X POST "http://localhost:3000/api/leads/<lead-id>/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "First follow-up comment from manual API check"
  }'
```

## Seed Data

Seed inserts:

- 7 leads with mixed statuses (`NEW`, `CONTACTED`, `IN_PROGRESS`, `WON`, `LOST`)
- 5 comments linked to several leads

Run:

```bash
cd apps/backend && npm run db:seed
```

## Production Build and Start (Non-Docker)

From repository root:

Build backend and frontend:

```bash
npm run build --workspace=apps/backend
npm run build --workspace=apps/frontend
```

Start backend in production mode:

```bash
npm run start:prod --workspace=apps/backend
```

Start frontend in production mode on port 3001:

```bash
npm run start --workspace=apps/frontend -- --port 3001
```

## What I did not have time to finish and how I would improve it

- Add automated e2e tests (backend API + frontend critical flows) to reduce manual verification effort.
- Add CI pipeline for lint/build/test checks on each pull request.
- Improve database indexing strategy for larger datasets (search + sorting paths).
- Add lightweight request logging/monitoring configuration for easier runtime diagnostics.
