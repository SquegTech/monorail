#!/bin/bash

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

cd "$SCRIPT_DIR"

if [ ! -f ../../monorail/.env ]
then
    echo "Copying .env.production to .env..."
    cp ../../monorail/.env.production ../../monorail/.env

    cd ../

    echo "Running composer install..."
    docker-compose -f docker-compose.production.yml exec monorail-app composer install --optimize-autoloader --no-dev

    echo "Generating Laravel key..."
    docker-compose -f docker-compose.production.yml exec monorail-app php artisan key:generate

    echo "Setting cache..."
    docker-compose -f docker-compose.production.yml exec monorail-app php artisan cache:clear
    docker-compose -f docker-compose.production.yml exec monorail-app php artisan config:cache
    docker-compose -f docker-compose.production.yml exec monorail-app php artisan route:cache
    docker-compose -f docker-compose.production.yml exec monorail-app php artisan view:cache

    echo "Running npm install..."
    docker-compose -f docker-compose.production.yml exec monorail-app npm install

    echo "Running npm..."
    docker-compose -f docker-compose.production.yml exec monorail-app npm run production

    echo "Optimizing composer..."
    docker-compose -f docker-compose.production.yml exec monorail-app composer dump-autoload -o

    echo "Restarting php-fpm..."
    docker-compose -f docker-compose.production.yml restart monorail-app

    echo "Done!"
fi