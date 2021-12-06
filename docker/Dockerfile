FROM php:8.1-fpm-alpine3.15

# Copy composer.lock and composer.json
#COPY ./monorail/composer.lock ./monorail/composer.json /var/www/

# Set working directory
WORKDIR /var/www

RUN apk update && apk upgrade \
# Install temporary build dependencies
    && apk add --no-cache --virtual .build-dependencies \
        ca-certificates \
        $PHPIZE_DEPS \
        build-base \
        curl-dev \
        libtool \
        libxml2-dev \
        postgresql-dev \
        zlib-dev \
        git \
        wget \
# Install dependencies
# The ncurses package is needed because of this issue: https://github.com/opencollective/opencollective/issues/1443
    && apk add --no-cache \
        shadow \
        ncurses \
        freetype-dev \
        libjpeg-turbo-dev \
        libpng-dev \
        libzip-dev \
        postgresql-libs \
        jpegoptim optipng pngquant gifsicle \
        vim \
        curl \
        nodejs \
        npm \
        bash \
        zip \
        unzip \
        icu-libs \
        krb5-libs \
        libgcc \
        libintl \
        libssl1.1 \
        libstdc++ \
        zlib \
        redis \
        hiredis \
        hiredis-dev \
        hiredis-ssl \
# Install extensions
    && docker-php-ext-install opcache pdo_pgsql pdo_mysql soap exif pcntl bcmath \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(getconf _NPROCESSORS_ONLN) gd \
# Install phpredis extension
    && git clone https://github.com/phpredis/phpredis.git /tmp/phpredis \
    && cd /tmp/phpredis \
    && git checkout -b 5.3.4 \
    && phpize \
    && ./configure \
    && make \
    && make install \
    && cd ../ \
    && rm -rf /tmp/phpredis \
# Install composer
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
# Remove the build dependencies
    && apk del -f .build-dependencies \
# Add user for laravel application
    && groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY ./monorail /var/www

# Copy existing application directory permissions
COPY --chown=www:www ./monorail /var/www

# Change current user to www
USER www

# Run composer install
#RUN composer install --no-interaction

# Start php-fpm server
CMD ["php-fpm"]
