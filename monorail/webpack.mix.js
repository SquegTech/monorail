const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.babel([
    'resources/js/race/spritefont.js',
    'resources/js/race/race.js'
], 'public/js/race.js')
    .styles([
        'resources/css/race/reset.css',
        'resources/css/race/race.css'
    ], 'public/css/race.css')
    .copy('resources/images/race', 'public/images/race')
