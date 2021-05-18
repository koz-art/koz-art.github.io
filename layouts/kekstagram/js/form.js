'use strict';
(function () {
  var upload = document.querySelector('.upload');
  var uploadSelectImage = upload.querySelector('#upload-select-image');
  var uploadFile = upload.querySelector('#upload-file');

  var uploadOverlay = upload.querySelector('.upload-overlay');
  var uploadCancel = upload.querySelector('#upload-cancel');

  var uploadFilterControls = upload.querySelector('.upload-filter-controls');
  var filterImagePreview = document.querySelector('.filter-image-preview');
  var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var resizeControlsField = uploadOverlay.querySelector('.upload-resize-controls-value');

  var STEP_VALUE = 25;

  // Применение фильтра к изображению

  var filterInitializer = window.initializeFilters(uploadFilterControls);

  var documentEscHandler = function (event) {
    if (window.utils.isDeactivateEvent(event)) {
      hideModal();
    }
  };

  var uploadCancelClickHandler = function () {
    hideModal();
  };

  var uploadFileChangeHandler = function () {
    showModal();
  };

  // показ модального окна
  var showModal = function () {
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');
    document.addEventListener('keydown', documentEscHandler);
    filterInitializer.enable();
  };

  // закрытие модального окна
  var hideModal = function () {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
    uploadFile.value = null;
    document.removeEventListener('keydown', documentEscHandler);
    filterInitializer.disable();
  };

  // Открытие формы загрузки фото по enter
  uploadSelectImage.addEventListener('keyup', window.utils.enterKeyHandler);

  // Открытие формы
  uploadFile.addEventListener('change', uploadFileChangeHandler);

  // Закрытие формы
  uploadCancel.addEventListener('click', uploadCancelClickHandler);

  // Изменение масштаба изображения
  var adjustScale = function (scale) {
    resizeControlsField.setAttribute('value', scale);
    filterImagePreview.style.transform = 'scale(' + parseInt(scale, 10) / 100 + ')';
    filterImagePreview.style.msTransform = 'scale(' + parseInt(scale, 10) / 100 + ')';
    filterImagePreview.style.webkitTransform = 'scale(' + parseInt(scale, 10) / 100 + ')';
  };

  window.initializeScale(resizeControls, STEP_VALUE, adjustScale);
})();
