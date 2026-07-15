# Investment Advisor Bot — v1

A questionnaire-driven advisor: answer 5 questions about your budget, horizon, risk tolerance,
liquidity need, and goal — get back three tiers of concrete investment options (**Safe /
Balanced / Aggressive-Niche**), each with a plain-language explanation of why it fits you.

See [`docs/PRODUCT_SPEC.md`](./docs/PRODUCT_SPEC.md) for the full product spec (also reusable
as a brief for Emergent or any other builder).

## How it's built, and why

- **Risk scoring and instrument matching are deterministic, rule-based code** — not left to the
  LLM. This keeps recommendations consistent, auditable, and explainable.
- **Gemini is used only to generate the "why this fits you" explanation text**, once the actual
  picks are already decided. If the Gemini call fails or no key is set, the app falls back to a
  template explanation automatically — the core product never breaks because of an LLM outage.
- **Curated instrument dataset** (`backend/src/data/instruments.json`) is where your market
  knowledge lives — this is the actual product moat, not the AI. Update this file to add/adjust
  instruments; no code changes needed for that.

## Project structure

```
financial-advisor-bot/
├── docs/
│   └── PRODUCT_SPEC.md        # full product spec / brief
├── backend/                   # Node + Express + TypeScript API
│   └── src/
│       ├── config/            # env loading
│       ├── routes/            # Express routers
│       ├── controllers/       # request validation + orchestration
│       ├── services/          # risk engine, instrument matcher, Gemini integration
│       ├── data/               # curated instrument dataset (JSON)
│       ├── models/            # shared TS types
│       └── middleware/        # error handling
└── frontend/                  # React + TypeScript + Vite + Tailwind
    └── src/
        ├── components/
        │   ├── questionnaire/  # 5-step wizard
        │   ├── results/        # tiered "depth band" results UI
        │   ├── layout/         # progress ladder nav
        │   └── ui/             # buttons, spinner, progress bar
        ├── pages/              # Landing / Questionnaire / Results
        ├── context/            # questionnaire answer state
        ├── hooks/              # data-fetching hook
        ├── services/           # API client
        └── types/              # shared frontend types
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your Gemini API key into GEMINI_API_KEY
npm run dev
```

Runs on `http://localhost:4000`. Health check: `GET /api/health`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`, proxies `/api` requests to the backend automatically (see
`vite.config.ts`).

### 3. Try it

Open `http://localhost:5173`, click through the questionnaire, and you'll land on the results
page with your three tiers.

## What's deliberately NOT in v1 (see roadmap in the product spec)

- No user accounts / auth / saved history
- No live market data feed — instrument data is a curated static file
- No real transaction execution — this is an educational tool, not a broker integration
- No database — instrument data is a JSON file; swap for Postgres/etc. in v2 without touching
  the API contract (the `data/` layer is isolated in `instrumentMatcher.service.ts`)

The folder structure is intentionally split (routes / controllers / services / data / models)
so that adding auth, a database, or more instrument categories later doesn't require restructuring.
