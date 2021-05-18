'use strict';

(function () {
  window.colorize = function (element, colors, inputHidden, onColorChange) {

    function colourElement() {
      var randomColor = window.utils.selectRandomElement(colors);

      if (element.style.fill === randomColor || element.style.backgroundColor === randomColor) {
        randomColor = window.utils.selectRandomElement(colors);
      }

      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = randomColor;
      } else {
        element.style.fill = randomColor;
        onColorChange(randomColor);
      }
      inputHidden.value = randomColor;
    }

    element.addEventListener('click', function () {
      colourElement();
    });
    element.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        colourElement();
      }
    });
  };
})();
