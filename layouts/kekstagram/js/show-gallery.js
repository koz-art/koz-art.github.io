'use strict';
window.showGallery = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayCloseBtn = galleryOverlay.querySelector('.gallery-overlay-close');
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');

  var closeGalleryOverlay = function () {
    galleryOverlay.classList.add('invisible');
    galleryOverlayCloseBtn.removeEventListener('click', onGalleryOverlayCloseBtnClick);
    galleryOverlayCloseBtn.removeEventListener('keydown', onGalleryOverlayCloseBtnKeydown);
    document.removeEventListener('keydown', documentEscHandler);
  };

  var onGalleryOverlayCloseBtnKeydown = function (event) {
    if (window.utils.isActivateEvent(event)) {
      closeGalleryOverlay(event);
    }
  };

  var documentEscHandler = function (event) {
    if (window.utils.isDeactivateEvent(event)) {
      closeGalleryOverlay();
    }
  };

  var onGalleryOverlayCloseBtnClick = function () {
    closeGalleryOverlay();
  };

  return function (data) {
    galleryOverlay.classList.remove('invisible');
    galleryOverlayImage.setAttribute('src', data.url);

    likesCount.innerText = data.likes;
    commentsCount.innerText = data.comments.length;

    document.addEventListener('keydown', documentEscHandler);
    galleryOverlayCloseBtn.addEventListener('click', onGalleryOverlayCloseBtnClick);
    galleryOverlayCloseBtn.addEventListener('keydown', onGalleryOverlayCloseBtnKeydown);
  };
})();
