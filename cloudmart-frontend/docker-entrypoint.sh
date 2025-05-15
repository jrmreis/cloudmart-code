#!/bin/sh
set -e

# Load environment variables from mounted ConfigMap
if [ -f /app/.env ]; then
  # Export all variables from the .env file
  export $(grep -v '^#' /app/.env | xargs)
fi

# Create config.js from template
if [ -f /app/public/config.js.template ]; then
  # Use envsubst to replace variables in the template
  envsubst < /app/public/config.js.template > /app/public/config.js
  echo "Generated /app/public/config.js with API_BASE_URL=${VITE_API_BASE_URL}"
else
  echo "Error: /app/public/config.js.template not found"
  exit 1
fi

# Start the server
echo "Starting server with command: $@"
exec "$@"
