# Endterm — Campus Systems

Two fully independent Next.js apps. Each has its own `package.json`, `node_modules`, and build.

| Folder | App | Dev port |
|---|---|---|
| `club-console/` | Club Console (customer side) | 3000 |
| `registrar-console/` | Registrar Console (main system) | 3001 |

```bash
cd club-console && npm install && npm run dev
cd registrar-console && npm install && npm run dev
```

They do not import from each other. They will communicate through a shared
database in the future — see each app's README (`lib/store.ts` is the integration point).
