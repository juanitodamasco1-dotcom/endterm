# Club Console

Standalone Next.js app. It has no code or build dependency on `../registrar-console`.

## Run

```bash
cd club-console
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Data / future database

All persistence goes through `lib/store.ts` (`Store.read / write / update / subscribe`).
Right now it uses browser `localStorage`. To connect to the shared database,
replace the body of `Store` with calls to the database (or API routes that query it)
and set `DATABASE_URL` in `.env.local` (see `.env.example`).
Both apps use the same `SharedDb` shape (`types/club.ts`), so they will share
records once they point to the same database.

## Demo login

- Email: `cs.society@jdjs.edu`
- Password: `ClubPass2026!` (every sample club uses this password)
