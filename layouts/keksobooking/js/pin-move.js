'use strict';

(function () {
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var PINS_BLOCK_MAX_RIGHT = 1200;
  var PINS_BLOCK_MIN_LEFT = 0;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_SHARP_END = 20;

  window.movePin = function (pin, onPinPositionChange) {

    pin.addEventListener('mousedown', function (evt) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var newPositionY = pin.offsetTop - shift.y;
        var newPositionX = pin.offsetLeft - shift.x;

        if (newPositionY >= MAX_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END)) {
          newPositionY = MAX_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END);
        }
        if (newPositionY <= MIN_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END)) {
          newPositionY = MIN_LOCATION_Y - (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END);
        }

        if (newPositionX >= PINS_BLOCK_MAX_RIGHT - MAIN_PIN_WIDTH) {
          newPositionX = PINS_BLOCK_MAX_RIGHT - MAIN_PIN_WIDTH;
        }
        if (newPositionX <= PINS_BLOCK_MIN_LEFT) {
          newPositionX = PINS_BLOCK_MIN_LEFT;
        }

        pin.style.top = newPositionY + 'px';
        pin.style.left = newPositionX + 'px';

        onPinPositionChange(evt);
      }

      function onMouseUp(upEvt) {
        onPinPositionChange(evt);
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (!window.isActivePage) {
          window.activatePage(upEvt);
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
