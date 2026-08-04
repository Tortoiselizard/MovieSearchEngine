# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (frontend only; `/api/*` calls will 404 unless the serverless functions are also running).
- `npm run vercel` — `vercel dev`: runs the frontend **and** the `/api` serverless functions locally. Use this when working on anything that hits the API.
- `npm run build` — production build (`vite build`).
- `npm run preview` — preview the production build.
- `npm run lint` — ESLint over `js,jsx` (config `standard` + `standard-jsx` + React rules).
- `npm test` — Vitest (jsdom environment). Tests live in `src/tests/`. Run a single file: `npx vitest run src/tests/first.test.js`; single test by name: `npx vitest -t "<test name>"`.

## Environment

`.env` (gitignored) provides: `API_READ_ACCESS_TOKEN` (TMDB bearer token, server-side only), `VITE_API_URL` (TMDB API base), `VITE_API_IMAGE_URL` (TMDB image base). The token is read via `process.env` **only inside `repositoryAPI/`** — it must never reach the client bundle. The `VITE_`-prefixed vars are the only ones exposed to the frontend.

## Architecture

This is a React 19 + Vite SPA whose data layer is a set of **Vercel serverless functions** in `/api`. The frontend never calls TMDB directly; it calls its own `/api/*` endpoints, which proxy TMDB using the secret token. Deployment and local API routing are governed by `vercel.json`.

### Backend: layered serverless (`api/` → `servicesAPI/` → `repositoryAPI/`)

Each endpoint follows a strict three-layer split — keep this separation when adding features:

- **`api/*.js`** — Vercel handler `(request, response)`. Reads `request.query`, instantiates the matching service, maps thrown errors to HTTP 500 JSON (`{ message }`). Dynamic route: `api/findById/[id].js` (rewritten from `/api/findById/:id` by `vercel.json`).
- **`servicesAPI/*Service.js`** — business logic as a class holding a private `#repository`. This is where pagination/filtering lives. Because TMDB paginates in fixed pages of 20 while the UI requests arbitrary `quantity`/`moviesPerPage`, services loop over TMDB pages, apply `filterBy`, and track a `lastMovie` cursor so the next request resumes mid-page (see `popularService.js` as the canonical example).
- **`repositoryAPI/*Repository.js`** — the **only** layer that reads env secrets and `fetch`es TMDB. Returns raw TMDB JSON.

Shared backend helpers in `libsAPI/`: `mappers.js` (`getFilters`, `getQueries` — parse the query string into typed filter/pagination objects), `filters.js` (`filterBy` — genre + already-seen-movie filtering), `pagination.js` (`getAPIPages`, `mapMovies` — translate between UI page size and TMDB's 20-per-page).

`errors/ApiError.js` is a custom `Error` subclass (`statusCode`, `details`) used on both sides of the wire.

### Frontend data flow

- **Global state**: a single `useReducer` store in `src/context/MyContext.jsx`, exposed via the `useMyContext()` hook (`{ state, dispatch }`). Action types and action creators are in `src/context/actions.js`. State is organized by domain (`home`, `search`, `genres`, `cast`, `actorFilms`, `movieDetails`, `actorDetails`, `history`, `alert`, `fab`).
- **Status convention**: every async slice carries `status: 'idle' | 'pending' | 'successful' | 'fail'` plus `error`. Components branch on `status` to render `Spinner` / `Error` / content. Fetch pattern: dispatch a `loadX()` (→ pending) before the request, `updateX()` on success, `updateErrorX()` + a `react-hot-toast` on failure. `App.jsx`/`Home.jsx` show the canonical pattern.
- **API client**: `src/services/moviesApi.js` wraps `fetch('/api/...')`, unwraps `ApiError`, and normalizes network errors to user-facing English messages. `requestMovies()` dispatches to `search`/`discover`/`popular` endpoints based on the query shape (has `text` → search; >4 filters → discover; else popular).
- **Frontend `libs/`**: `mappers.js` `getQueriesString` serializes a query object to a URL string (arrays are JSON-stringified — the backend `getFilters` `JSON.parse`s them back). `validations.js` has `deepEqual`.

### Routing & navigation

Routes are declared in `src/main.jsx` (`react-router` v7, `BrowserRouter`) under a shared `Layout`: `/`, `movies/:id`, `search`, `actors/:id`, `favorites`, `cast/:id`, `actor-films/:id`, `notFound`, and `*` → `Redirect`. `vercel.json` rewrites all non-`/api` paths to `index.html` for SPA routing.

There is a **custom history stack** in `src/hooks/useHistory.js` (separate from the browser history): the reducer's `history` slice holds `{ list: [{ url, scroll }], index }`, letting the app restore scroll position and drive its own back navigation (`ComeBack` component). Prefer this hook over raw `navigate` where scroll restoration matters. (Note: `src/hooks/navegation.js` is an unfinished stub — ignore it.)

### Components

Feature components live one-per-folder under `src/components/<Name>/` with a co-located `*.module.css` (CSS Modules). `Carousel` takes a single child component and clones it per item; `LazyImage` handles progressive image loading; `Favorites` persists to localStorage.

## Conventions

- **Language**: identifiers, comments, and commit messages are in English; commits follow `type(MSE-###): description` (Jira-style ticket refs).
- **Style**: `standard` (2-space indent, no semicolons, single quotes). Run `npm run lint` before committing.
- Files `src/movies.json` and `src/genres.json` are local API-response fixtures/samples, not app data.
