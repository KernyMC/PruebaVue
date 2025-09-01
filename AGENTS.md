# Repository Guidelines

## Project Structure & Modules
- `src/`: Vue 3 source code (Vite).
  - `main.js`: App entry and mount.
  - `App.vue`: Root layout; hosts playground.
  - `components/FieldPlayground.vue`: Simple form to test types.
- `index.html`: Vite HTML entry.
- `vite.config.js`: Vite + Vue plugin config.
- `package.json`: Scripts and dependencies.

## Build, Test, and Development
- `npm install`: Install dependencies.
- `npm run dev`: Start Vite dev server at `http://localhost:5173`.
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Preview the production build locally.

## Coding Style & Naming
- **Language**: Vue 3 + `<script setup>`; ES modules.
- **Indentation**: 2 spaces; LF endings; UTF-8.
- **Components**: `PascalCase` (e.g., `FieldPlayground.vue`).
- **Files/Folders**: `kebab-case` for non-components when applicable.
- **Formatting/Linting**: Keep templates declarative; prefer computed/refs over ad‑hoc DOM.

## Testing Guidelines
- **Manual**: Interact with `FieldPlayground` to validate text, number, boolean, select, date, and photo (with preview).
- **Automated**: None configured yet. If adding, prefer Vitest + Vue Test Utils; name tests `*.spec.ts` under `src/`.

## Commit & Pull Requests
- **Commits**: Use concise, imperative subject (e.g., `feat: add photo preview`).
- **PRs**: Include purpose, key changes, screenshots/GIFs for UI updates, and link issues (e.g., `Closes #12`). Keep diffs focused and self‑contained.

## Security & Configuration
- Do not commit secrets. Use environment files (`.env.local`) for local overrides. Avoid large binary assets; prefer small sample images for testing.
- Firestore setup: copy `.env.example` to `.env.local` and set `VITE_FIREBASE_*` keys. Install deps with `npm install`. Data submits to the `submissions` collection via `src/lib/firebase.js`.
