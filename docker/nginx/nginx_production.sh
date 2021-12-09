#!/bin/sh

set -e

if [ -z "$DOMAIN" ]; then
  echo "DOMAIN environment variable is not set"
  exit 1;
fi

if [ ! -f "/etc/nginx/ssl/dummy/$DOMAIN/fullchain.pem" ]; then
  echo "Generating dummy ceritificate for $DOMAIN"
  mkdir -p "/etc/nginx/ssl/dummy/$DOMAIN"
  openssl req -x509 -nodes -days 3650 \
    -subj  "/C=${COUNTRY}/ST=${STATE}/O=${ORGANIZATION}/CN=${DOMAIN}" \
    -newkey rsa:4096 -sha256 -keyout "/etc/nginx/ssl/dummy/${DOMAIN}/privkey.pem" \
    -out "/etc/nginx/ssl/dummy/${DOMAIN}/fullchain.pem" \
    -addext "subjectAltName=DNS:${DOMAIN}, DNS:www.${DOMAIN}" \
    -addext "extendedKeyUsage=serverAuth" \
    -addext "keyUsage=digitalSignature"
fi

if [ ! -f /etc/nginx/ssl/ssl-dhparams.pem ]; then
  openssl dhparam -dsaparam -out /etc/nginx/ssl/ssl-dhparams.pem 4096
fi

use_lets_encrypt_certificates() {
  echo "Switching Nginx to use Let's Encrypt certificate for $1"
  sed -i "s|/etc/nginx/ssl/dummy/$1|/etc/letsencrypt/live/$1|g" /etc/nginx/conf.d/default.conf
}

reload_nginx() {
  echo "Reloading Nginx configuration"
  nginx -s reload
}

wait_for_lets_encrypt() {
  until [ -d "/etc/letsencrypt/live/$1" ]; do
    echo "Waiting for Let's Encrypt certificates for $1"
    sleep 5s & wait ${!}
  done
  use_lets_encrypt_certificates "$1"
  reload_nginx
}

if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  wait_for_lets_encrypt "$DOMAIN" &
else
  use_lets_encrypt_certificates "$DOMAIN"
fi

exec nginx -g "daemon off;"