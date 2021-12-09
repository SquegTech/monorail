# Monorail Racing League Website

## Getting Started

### Development Environment

1. git clone https://github.com/tommy-bolger/monorail.git <target_directory>
2. cd <target_directory>
3. cp docker/.env.development docker/.env
4. ./docker/build_docker_images.sh
5. cd docker/
6. docker-compose -f docker-compose.development.yml up --build
7. ./laravel/development_first_time_install.sh
8. Navigate to https://local.monorail.test

Once all setup the bash shell for the PHP app can be accessed with `docker-compose -f docker-compose.development.yml exec monorail-app bash`. Inside of the bash shell the following things can be done:
- Run a Laravel command with `php artisan`.
- Execute `npm run development` to compile assets once to `npm run watch` to automatically compile assets when they are changed.

### Production Environment

1. git clone https://github.com/tommy-bolger/monorail.git <target_directory>
2. cd <target_directory>
3. cp docker/.env.production docker/.env
4. Change value for CERTBOT_EMAIL to a real email in .env.
5. cd docker && ./build_docker_images.sh
6. cd docker/
7. docker volume create --name=monorail-webserver-ssl && docker volume create --name=monorail-certbot-certs
8. docker-compose -f docker-compose.production.yml up --build -d
9. ./laravel/production_first_time_install.sh
10. Navigate to https://www.monorail.live
