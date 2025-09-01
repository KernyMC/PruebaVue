# PruebaVue

Minimal Vue 3 + Vite playground to test common input fields (text, number, boolean, select, date, and photo preview) with optional Firestore submission.

## Getting Started
- Install: `npm install`
- Dev server: `npm run dev` (open http://localhost:5173)
- Build: `npm run build`

## Firestore (optional)
1. Copy `.env.example` to `.env.local` and set `VITE_FIREBASE_*` keys.
2. Submit via the "Send to Firestore" button in the UI (collection: `submissions`).

## Repo Structure
- `src/components/FieldPlayground.vue`: Form playground + submit.
- `src/lib/firebase.js`: Firebase bootstrap + submit helper.
- `src/App.vue`, `src/main.js`, `index.html`, `vite.config.js`.

## License
This repository has no license specified.
