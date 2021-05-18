'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    isEnterPressed: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscPressed: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEY_CODE;
    },

    selectRandomElement: function (data) {
      var index = Math.floor(Math.random() * data.length);
      return data[index];
    },

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getRandomElements: function (originalData, number) {
      var data = [];
      var newData = window.utils.shuffleArray(originalData.slice());
      for (var i = 0; i < number; i++) {
        data[i] = newData[i];
      }
      return data;
    },

    clearParentFromNodes: function (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }
  };
})();

