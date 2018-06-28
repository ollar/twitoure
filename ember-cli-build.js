'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = EmberApp.env();
const IS_PROD = environment === 'production';
const IS_TEST = environment === 'test';

module.exports = function(defaults) {
    let app = new EmberApp(defaults, {
        // Add options here
        'esw-cache-first': {
            // RegExp patterns specifying which URLs to cache.
            patterns: [
                'https://api.tiles.mapbox.com/(.+)',
                // 'https://.*tile.openstreetmap.org/(.+)',
            ],

            // changing this version number will bust the cache
            version: '1',
        },
        'ember-service-worker': {
            enabled: false,
            versionStrategy: 'every-build',
        },

        hinting: IS_TEST,
        tests: IS_TEST,
        'ember-cli-babel': {
            includePolyfill: IS_PROD,
        },
        autoprefixer: {
            sourcemap: false, // Was never helpful
        },
    });

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    app.import('node_modules/leaflet/dist/leaflet.js');
    app.import('node_modules/leaflet/dist/leaflet.css');

    app.import('node_modules/fingerprintjs2/dist/fingerprint2.min.js');

    app.import('vendor/shims/leaflet.js');
    app.import('vendor/shims/fingerprintjs2.js');

    app.import('node_modules/normalize.css/normalize.css');
    app.import('node_modules/feather-icons/dist/feather-sprite.svg');

    return app.toTree();
};
