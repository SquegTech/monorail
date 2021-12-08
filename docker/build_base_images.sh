#!/usr/bin/env bash
SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

cd "$SCRIPT_DIR"

# Copy .env.development to .env
cp .env.development .env

DOCKERFILE_SHARED_PATH="Dockerfile.shared"

echo "Generating Dockerfiles..."
SHARED_DOCKERFILE=$(<Dockerfile.shared)

# Generate the Dockerfile for the web app image.
echo "FROM php:8.1-fpm-alpine3.15

${SHARED_DOCKERFILE}

# Start php-fpm server
CMD [\"php-fpm\"]
" > Dockerfile.app

# Generate the Dockerfile for the CLI image.
echo "FROM php:8.1-cli-alpine3.15

${SHARED_DOCKERFILE}
" > Dockerfile.cli

echo "Removing old images..."
docker rmi monorail/web:latest
docker rmi monorail/cli:latest

cd ../

echo "Building the web image..."
docker build . -f ./docker/Dockerfile.app -t monorail/web:latest --no-cache

echo "Building the cli image..."
docker build . -f ./docker/Dockerfile.cli -t monorail/cli:latest --no-cache