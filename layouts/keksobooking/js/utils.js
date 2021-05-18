'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  return {

    isEscPressed: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEY_CODE;
    },

    debounce: function (fun) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
