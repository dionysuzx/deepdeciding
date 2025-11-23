# start the app
app:
  bun run dev --open

# lint the javascript code
lint-js:
  bun run format-lint

# lint and fix the javascript code
lint-js-fix:
  bun run format-lint:fix

# D1 Database Commands

# initialize remote database with schema
db-init:
  bunx wrangler d1 execute deep-sentiment-db --remote --file=./schema.sql

# initialize local database with schema
db-init-local:
  bunx wrangler d1 execute deep-sentiment-db --local --file=./schema.sql

# query remote database
db-query QUERY:
  bunx wrangler d1 execute deep-sentiment-db --remote --command="{{QUERY}}"

# query local database
db-query-local QUERY:
  bunx wrangler d1 execute deep-sentiment-db --local --command="{{QUERY}}"

# Development & Deployment

# start dev server with D1 support (local database)
dev:
  bunx wrangler dev --local

# start dev server with D1 support (remote database)
dev-remote:
  bunx wrangler dev --remote

# build and deploy to cloudflare
deploy:
  bun run build
  bunx wrangler deploy
