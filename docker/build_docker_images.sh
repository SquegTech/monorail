#!/usr/bin/env bash
echo "Removing old images..."
docker rmi monorail-app:latest
echo "Building the app image..."
docker build . -f ./docker/Dockerfile -t monorail-app:latest --no-cache
