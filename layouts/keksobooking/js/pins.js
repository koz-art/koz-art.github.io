'use strict';

(function () {
  var NUMBER_OF_ELEMENTS = 5;
  var map = document.querySelector('.map');
  var mapPinsBlock = map.querySelector('.map__pins');

  function onOfferPinClick(evt) {
    window.pins.cancelActive();
    evt.currentTarget.classList.add('map__pin--active');
    window.card.create(evt.currentTarget.offerData);
  }

  window.pins = {
    render: function (userPins) {
      var pinsToShow = userPins.slice(0, NUMBER_OF_ELEMENTS);
      var pinsFragment = document.createDocumentFragment();

      pinsToShow.forEach(function (element) {
        var offerPin = window.createPin(element);
        offerPin.offerData = element;
        offerPin.addEventListener('click', onOfferPinClick);
        pinsFragment.appendChild(offerPin);
      });

      window.pins.remove();
      mapPinsBlock.appendChild(pinsFragment);
    },

    remove: function () {
      var mapPinsList = mapPinsBlock.querySelectorAll('.map__pin');

      mapPinsList.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          pin.parentElement.removeChild(pin);
        }
      });
    },

    cancelActive: function () {
      var mapPinsList = map.querySelectorAll('.map__pin');
      mapPinsList.forEach(function (pin) {
        pin.classList.remove('map__pin--active');
      });
    }
  };
})();
