# NovaStudio

AI-powered digital agency platform. Build, launch, and scale digital products faster.

## Architecture

```
NovaStudio/
├── frontend/     # Next.js 16 (App Router) + MUI v7 — Landing page + Admin dashboard
├── backend/      # Express 5 + Prisma (PostgreSQL) + Mongoose (MongoDB) — REST API
└── valzy-web/    # Vite + React + Tailwind — Client-facing app
```

---

## Frontend (`frontend/`)

**Stack:** Next.js 16, React 19, MUI v7, Emotion, Axios

### Getting Started

```bash
cd frontend
npm install
cp .env.local .env.local   # already exists — configure if needed
npm run dev                 # http://localhost:3000
```

### Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Backend API base URL |

### Build

```bash
npm run build
npm start
```

### Key Directories

| Path | Description |
|------|-------------|
| `src/app/` | Pages (App Router) — landing page + admin routes |
| `src/app/admin/` | Admin dashboard, login, analytics, contacts, projects, services, stats |
| `src/components/landing/` | Landing page sections (Hero, Services, Portfolio, etc.) |
| `src/components/admin/` | Admin components (Sidebar) |
| `src/context/` | ThemeContext (dark/light mode), AuthContext |
| `src/theme/` | MUI theme definition |
| `src/services/` | Axios API client |

---

## Backend (`backend/`)

**Stack:** Express 5, Prisma (PostgreSQL), Mongoose (MongoDB), JWT, bcryptjs

### Getting Started

```bash
cd backend
cp .env .env           # already exists — update for production
npm install
npx prisma generate
npx prisma db push     # create tables
npx prisma db seed     # seed admin user + sample data
npm run dev            # http://localhost:5000
```

### Prerequisites

- **PostgreSQL** — can run via Docker: `docker compose up -d`
- **MongoDB** — Atlas URI in `MONGO_URI` env var

### Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/novastudio` | PostgreSQL connection string |
| `MONGO_URI` | — | MongoDB Atlas connection string (for analytics/logs) |
| `JWT_SECRET` | — | Secret key for JWT tokens |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed frontend origin |

### API Routes

| Route | Description |
|-------|-------------|
| `POST /api/admin/login` | Admin login |
| `POST /api/admin/logout` | Admin logout |
| `GET/POST /api/service/` | CRUD services |
| `GET/POST /api/project/` | CRUD projects |
| `GET/PUT /api/stats/` | Read/update stats |
| `GET/DELETE /api/contact/` | List/delete contacts |
| `POST /api/contact/` | Create contact (public) |
| `GET/POST /api/analytic/` | Analytics events |
| `GET /api/logs/` | Audit logs |

### Seeded Admin

| Email | Password |
|-------|----------|
| `admin@novastudio.com` | `admin123` |

---

## Deployment

### Backend → Render

1. Create a **Web Service** on Render, point to the `backend/` directory
2. **Build Command:** `npm install && npx prisma generate`
3. **Start Command:** `npm start` (requires `"start": "node ./src/server.js"` in `backend/package.json`)
4. **Environment Variables** (set in Render dashboard):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Render PostgreSQL URL (or external) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Your secret key |
| `CORS_ORIGIN` | Frontend URL (e.g. `https://your-app.vercel.app`) |

5. Run `npx prisma db seed` once via Render Shell to create the admin user.

### Frontend → Vercel

1. Connect the `frontend/` directory to Vercel
2. Set `NEXT_PUBLIC_API_URL` to the Render backend URL

---

## Dark Mode

The frontend supports dark/light mode via `ThemeContext`. Toggle is in the admin sidebar. Preference is persisted in `localStorage` under `nova-theme`.
