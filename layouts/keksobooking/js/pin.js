'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var pinSimilar = mapPinTemplate.content.querySelector('.map__pin');

  window.createPin = function (user) {
    var mapPin = pinSimilar.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (user.location.x - PIN_WIDTH / 2) + 'px; top:' + (user.location.y - PIN_HEIGHT) + 'px;';
    mapPinImg.src = user.author.avatar;
    mapPinImg.alt = user.offer.title;

    return mapPin;
  };
})();
