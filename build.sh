#!/bin/bash
set -e

# Composer sering tidak ada di build container Vercel — kalau ada,
# rapikan dependency; kalau tidak, pakai vendor yang ikut di-upload.
if command -v composer >/dev/null 2>&1; then
    composer install --optimize-autoloader --no-dev --no-interaction --no-progress
fi

npm ci
npm run build
