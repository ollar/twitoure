(function() {
    function vendorModule() {
        'use strict';

        return {
            default: self['L'],
            __esModule: true,
        };
    }

    define('leaflet', [], vendorModule);
})();
