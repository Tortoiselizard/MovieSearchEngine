# Movie Search Engine

A movie discovery SPA built with React 19 + Vite. It lets you browse popular movies, search by title, filter by genre, and explore movie details, cast, and actor filmographies. Movie data comes from [TMDB](https://www.themoviedb.org/), proxied through Vercel serverless functions so the API token never reaches the client.

## Features

- Browse popular / trending movies
- Search movies by title and filter by genre
- Movie details with cast, ratings, and metadata
- Actor details and their filmography
- Favorites (persisted in `localStorage`)
- Custom history stack with scroll restoration

## Tech stack

- **Frontend:** React 19, React Router 7, Vite 6, CSS Modules
- **State:** React Context + `useReducer`
- **Backend:** Vercel serverless functions (`/api`) proxying the TMDB API
- **Tooling:** ESLint (`standard` + `standard-jsx`), Vitest (jsdom)

## Architecture

The frontend never calls TMDB directly. It calls its own `/api/*` endpoints, which are Vercel serverless functions organized in three layers:

```
api/*.js            → request handler (parses query, maps errors to HTTP)
servicesAPI/*.js    → business logic (pagination, filtering)
repositoryAPI/*.js  → the only layer that reads the secret token and fetches TMDB
```

Global state lives in a single `useReducer` store (`src/context/MyContext.jsx`), consumed via the `useMyContext()` hook. Each async slice follows a `status: idle | pending | successful | fail` convention.

See [`CLAUDE.md`](./CLAUDE.md) for a deeper architecture overview.

## Getting started

### Prerequisites

- Node.js 22.x
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`) — required to run the API locally
- A TMDB API read access token

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   API_READ_ACCESS_TOKEN=your_tmdb_read_access_token
   VITE_API_URL=https://api.themoviedb.org/3
   VITE_API_IMAGE_URL=https://image.tmdb.org/t/p
   ```

3. Log in to Vercel (first time only):

   ```bash
   vercel login
   ```

### Running locally

> **Important:** use `npm run vercel`, **not** `npm run dev`.
>
> `npm run dev` starts Vite alone (port **5173**) and does **not** run the `/api` serverless functions, so every request fails with *"Something is wrong"*. Use it only for pure UI work.
>
> `npm run vercel` runs the frontend **and** the API together on port **3000** — this is the one you want.

```bash
npm run vercel
```

Then open the URL it prints (usually **http://localhost:3000**).

## Scripts

| Command           | Description                                                        |
| ----------------- | ----------------------------------------------------------------- |
| `npm run vercel`  | Run frontend + `/api` functions locally (Vercel CLI, port 3000)   |
| `npm run dev`     | Run Vite only, no API (port 5173) — UI work only                  |
| `npm run build`   | Production build                                                  |
| `npm run preview` | Preview the production build                                      |
| `npm run lint`    | Lint `.js` / `.jsx` files                                         |
| `npm test`        | Run tests (Vitest)                                                |

## Project structure

```
api/            Vercel serverless functions (request handlers)
servicesAPI/    Backend business logic (pagination, filtering)
repositoryAPI/  TMDB fetch layer (reads the secret token)
libsAPI/        Backend helpers (mappers, filters, pagination)
errors/         Shared ApiError class
src/
  components/   Feature components (one folder each, co-located CSS Modules)
  context/      Global store (reducer, actions) + useMyContext hook
  services/     Frontend API client (fetches /api/*)
  hooks/        Custom hooks (useHistory, ...)
  libs/         Frontend helpers (query serialization, validations)
```
