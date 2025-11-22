# start the app
app:
  bun run dev --open

# lint the javascript code
lint-js:
  bun run format-lint

# lint and fix the javascript code
lint-js-fix:
  bun run format-lint:fix
