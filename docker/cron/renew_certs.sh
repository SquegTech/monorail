#!/bin/sh

cd /workdir
echo "Renewing Let's Encrypt Certificates... (`date`)"
docker-compose run --entrypoint monorail-certbot certbot renew
echo "Reloading Nginx configuration"
docker-compose exec -T monorail-webserver nginx -s reload
