# Development Guide

## Quick Start

### Run the app
```bash
just app
```

### Lint code
```bash
just lint-js
just lint-js-fix  # with auto-fix
```

## Cloudflare D1 Database

### Setup (One-time)

1. **Create the database in Cloudflare Dashboard**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Workers & Pages** → **D1 SQL Database**
   - Click **Create Database**
   - Name: `deep-sentiment-db`
   - Copy the Database ID and update it in `wrangler.jsonc`

2. **Initialize the database**
   ```bash
   just db-init          # Initialize remote database
   just db-init-local    # Initialize local database
   ```

### Common Database Operations

```bash
just db-init          # Initialize remote database with schema
just db-init-local    # Initialize local database with schema
just db-query "SELECT * FROM counter"         # Query remote database
just db-query-local "SELECT * FROM counter"   # Query local database
```

### Development with D1

To test D1 locally, you must use `bunx wrangler dev` instead of the normal `bun run dev`:

```bash
just dev          # Development server with D1 (local database)
just dev-remote   # Development server with D1 (remote database)
```

Then visit `http://localhost:8787/counter-test` to see the counter demo.

**Note:** The regular `just app` command won't have access to D1 bindings.

### Deployment

```bash
just deploy       # Build and deploy to Cloudflare Workers
```

## API Endpoints

### Counter API
- **GET** `/api/counter` - Get current count
- **POST** `/api/counter` - Increment count
- **DELETE** `/api/counter` - Reset to 0

### Test Page
Visit `/counter-test` to see the D1 integration demo.

## Project Structure

```
src/
├── app.d.ts                          # TypeScript types (includes D1)
└── routes/
    ├── api/
    │   └── counter/
    │       └── +server.ts            # Counter API endpoint
    └── counter-test/
        └── +page.svelte              # Counter demo page
```

## Troubleshooting

### "Database not available" error
- Ensure `database_id` is updated in `wrangler.jsonc`
- Use `bunx wrangler dev` (not `bun run dev`) for D1 testing
- Run `just db-init-local` to initialize local database

### Database isn't syncing
- Local database (`--local`): Stored in `.wrangler/state/v3/d1`
- Remote database (`--remote`): Your production Cloudflare D1 database
- Make sure you're testing against the right one

## Resources

- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [D1 Worker API](https://developers.cloudflare.com/d1/worker-api/)
- [SvelteKit + Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
