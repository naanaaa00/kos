#!/bin/bash
set -e

composer install --optimize-autoloader --no-dev --no-interaction --no-progress

npm ci
npm run build
