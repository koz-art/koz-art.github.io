'use strict';
window.initializeScale = (function () {
  var upload = document.querySelector('.upload');
  var uploadOverlay = upload.querySelector('.upload-overlay');
  var resizeButtonDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeButtonInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsField = uploadOverlay.querySelector('.upload-resize-controls-value');

  var MIN_VALUE = 25;
  var MAX_VALUE = 100;
  var DEFAULT_VALUE = 100;

  return function (element, step, cb) {
    cb(DEFAULT_VALUE);

    element.addEventListener('click', function (event) {
      var target = event.target;

      if (target.tagName.toLowerCase() === 'button' && target.classList.contains('upload-resize-controls-button')) {
        var currentButton = target;
        var currentValue = parseInt(resizeControlsField.getAttribute('value'), 10);

        if (currentButton === resizeButtonDec && currentValue !== MIN_VALUE) {
          currentValue -= step;
          if (currentValue < MIN_VALUE) {
            currentValue = MIN_VALUE;
          }
        }

        if (currentButton === resizeButtonInc && currentValue !== MAX_VALUE) {
          currentValue += step;
          if (currentValue > MAX_VALUE) {
            currentValue = MAX_VALUE;
          }
        }

        cb(currentValue);
      }
    });
  };
})();
