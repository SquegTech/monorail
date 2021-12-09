#!/bin/bash

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

cd "$SCRIPT_DIR"

if [ ! -f ../../monorail/.env ]
then
    echo "Copying .env.development to .env..."
    cp ../../monorail/.env.development ../../monorail/.env

    cd ../

    echo "Running composer install..."
    docker-compose -f docker-compose.development.yml exec monorail-app composer install

    echo "Generating Laravel key..."
    docker-compose -f docker-compose.development.yml exec monorail-app php artisan key:generate

    echo "Clearing cache..."
    docker-compose -f docker-compose.development.yml exec monorail-app php artisan cache:clear
    docker-compose -f docker-compose.development.yml exec monorail-app php artisan config:clear
    docker-compose -f docker-compose.development.yml exec monorail-app php artisan route:clear
    docker-compose -f docker-compose.development.yml exec monorail-app php artisan view:clear

    echo "Running npm install..."
    docker-compose -f docker-compose.development.yml exec monorail-app npm install

    echo "Running npm..."
    docker-compose -f docker-compose.development.yml exec monorail-app npm run development

    echo "Done!"
fi