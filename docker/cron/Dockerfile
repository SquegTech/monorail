FROM monorail/cli:latest

USER root

RUN apk update \
    && apk add --no-cache docker-cli python3 \
    && apk add --no-cache --virtual .docker-compose-deps \
    	python3-dev \
    	libffi-dev \
    	openssl-dev \
    	gcc \
    	libc-dev \
    	make \
    && apk add py3-pip \
    && pip install docker-compose \
    && apk del .docker-compose-deps

COPY renew_certs.sh /etc/periodic/daily/renew_certs
RUN echo '*  *  *  *  * /usr/local/bin/php  /var/www/artisan schedule:run >> /dev/null 2>&1' > /etc/crontabs/root

RUN chmod +x /etc/periodic/daily/renew_certs

WORKDIR /workdir

USER www

CMD ["crond", "-f", "-l", "0"]
