'use strict';
(function () {
  var filterLevelPin = document.querySelector('.upload-filter-level-pin');
  var filterLevelValue = document.querySelector('.upload-filter-level-val');
  var filterImagePreview = document.querySelector('.filter-image-preview');
  var MAX_VALUE = 455;
  var MIN_VALUE = 0;
  var startPointX;
  var shiftX;
  var isDragging = false;

  window.setFilterSliderValue = function (elem, newValue) {
    var filterValue = getComputedStyle(elem).filter.split('(', 1).join();
    elem.style.filter = filterValue + '(' + (newValue / MAX_VALUE).toFixed(2) + ')';
    elem.style.webkitFilter = filterValue + '(' + (newValue / MAX_VALUE).toFixed(2) + ')';
  };


  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var newPointX = moveEvt.clientX;
    var currentValue = filterLevelPin.offsetLeft;

    shiftX = startPointX - newPointX;

    var newValue = currentValue - shiftX;

    if (newValue > MAX_VALUE) {
      newValue = MAX_VALUE;
      newPointX = startPointX;
    } else if (newValue < MIN_VALUE) {
      newValue = MIN_VALUE;
      newPointX = startPointX;
    }
    filterLevelPin.style.left = newValue / MAX_VALUE * 100 + '%';
    filterLevelValue.style.width = filterLevelPin.style.left;

    window.setFilterSliderValue(filterImagePreview, newValue);
    startPointX = newPointX;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    isDragging = false;
  };

  filterLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (isDragging) {
      onMouseUp();
    }
    isDragging = true;

    startPointX = evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
