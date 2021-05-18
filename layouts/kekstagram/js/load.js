'use strict';
window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      window.console.log('Error ' + xhr.status + ' occurred while receiving the document');
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
