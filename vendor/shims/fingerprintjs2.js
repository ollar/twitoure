(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['fingerprintjs2'],
      __esModule: true,
    };
  }

  define('fingerprintjs2', [], vendorModule);
})();
