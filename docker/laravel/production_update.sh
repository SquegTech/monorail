#!/bin/bash

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

cd "$SCRIPT_DIR"

if [ -f ../../monorail/.env ]
then
  cd ../

  echo "Setting the site into maintenance mode..."
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan down --message="Monorail is currently down for maintenance."

  echo "Running composer install..."
  docker-compose -f docker-compose.production.yml exec monorail-app composer install --optimize-autoloader --no-dev

  echo "Running npm install..."
  docker-compose -f docker-compose.production.yml exec monorail-app npm install --production

  echo "Running npm..."
  docker-compose -f docker-compose.production.yml exec monorail-app npm run production

  echo "Resetting cache..."
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan cache:clear
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan config:cache
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan route:cache
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan view:cache

  echo "Restarting php-fpm..."
  docker-compose -f docker-compose.production.yml restart monorail-app

  echo "Bringing the site out of maintenance mode..."
  docker-compose -f docker-compose.production.yml exec monorail-app php artisan up

  echo "Done!"
fi
