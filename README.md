# Kanban Board

A Kanban board (columns + draggable task cards) built with Next.js, a GraphQL API (Apollo Server + Apollo Client), and Neon Postgres for persistence.

## Tech stack

- **Next.js** (App Router)
- **Apollo Server** (embedded in a Next.js Route Handler) + **Apollo Client** (`InMemoryCache` doubles as client-side state management)
- **Neon Postgres** + **Drizzle ORM** for the schema and versioned migrations
- **Tailwind CSS v4**, with a token-driven design system under `theme/`

## Prerequisites

- Node.js 24+
- [pnpm](https://pnpm.io)
- A free [Neon](https://neon.tech) Postgres project (just need its connection string — no local Postgres install required)

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set `DATABASE_URL` to your Neon connection string.

3. Apply database migrations (creates the `columns`/`tasks` tables — no seed data, the board starts empty):

   ```bash
   pnpm db:migrate
   ```

4. Run the dev server:

   ```bash
   pnpm dev
   ```

   The app runs at `http://localhost:3000`; the GraphQL API is served from the same app at `http://localhost:3000/api/graphql`.

## Available scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm typecheck` | Run `tsc --noEmit` |
| `pnpm db:generate` | Diff `db/schema.ts` and generate a new versioned SQL migration under `drizzle/` |
| `pnpm db:migrate` | Apply any pending migrations to your Neon database |

## Project structure

```
app/                          Next.js routes only
  page.tsx                    Home route
  layout.tsx                  Root layout, wraps the app in ApolloProvider
  api/graphql/route.ts        Apollo Server, mounted as a Route Handler
components/
  ui/                         Reusable design-system components (Button, Input, Card, Popover)
  providers/                  ApolloClientProvider (Client Component)
theme/                        Design tokens (colors, spacing, radius, typography), sourced from Figma
tailwind.config.ts            Wires theme/ tokens into Tailwind
graphql/
  schema.ts                   GraphQL SDL (Query/Mutation/types)
  resolvers.ts                Resolvers, delegate straight to store.ts
  store.ts                    Data-access functions (Drizzle queries)
db/
  schema.ts                   Drizzle table definitions (Postgres schema)
  client.ts                   Drizzle client wired to Neon's HTTP driver
drizzle/                      Versioned, committed SQL migrations
drizzle.config.ts             drizzle-kit configuration
```

## Environment variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string, e.g. `postgres://user:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require` |
