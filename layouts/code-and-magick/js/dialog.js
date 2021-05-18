'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var dialogHandler = setup.querySelector('.upload');
  var setapStartY;
  var setapStartX;

  function onPopupEscPress(evt) {
    if (window.utils.isEscPressed(evt) && evt.currentTarget !== setupUserName) {
      window.closePopup();
    }
    evt.stopPropagation();
  }

  function openPopup() {
    setup.classList.remove('hidden');
    setupUserName.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('keydown', onPopupEscPress);
    setapStartY = setup.offsetTop;
    setapStartX = setup.offsetLeft;
  }

  window.closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = setapStartY + 'px';
    setup.style.left = setapStartX + 'px';
  };

  // Открытие диалога
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      openPopup();
    }
  });

  // Закрытие диалога
  setupClose.addEventListener('click', function () {
    window.closePopup();
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.closePopup();
    }
  });

  // Перемещение диалога
  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      function onClickPreventDefault(e) {
        e.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
      }

      if (dragged) {
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
