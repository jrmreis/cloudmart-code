#!/bin/sh
set -e

# Load environment variables from mounted ConfigMap
if [ -f /app/.env ]; then
  echo "Loading environment variables from ConfigMap"
  export $(grep -v '^#' /app/.env | xargs)
  echo "Loaded VITE_API_BASE_URL=${VITE_API_BASE_URL}"
else
  echo "Warning: No .env file found at /app/.env"
fi

# Create config.js from template
if [ -f /app/config.js.template ]; then
  echo "Generating config.js from template"
  envsubst < /app/config.js.template > /app/config.js
  echo "Generated config.js with API_BASE_URL=${VITE_API_BASE_URL}"
else
  echo "Error: config.js.template not found"
  exit 1
fi

# Start the server
echo "Starting server: $@"
exec "$@"
