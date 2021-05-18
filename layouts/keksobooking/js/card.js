'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var mapCardSimilar = mapPinTemplate.content.querySelector('.map__card');

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');


  var homeTypeMap = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
    noName: 'Неизвестный тип жилья'
  };

  function onPopupEscPress(evt) {
    if (window.utils.isEscPressed(evt)) {
      window.card.close();
    }
  }

  function getHomeType(value) {
    return value ? homeTypeMap[value] : homeTypeMap.noName;
  }

  function setFeatures(parentElement, listElements, userFeatures) {
    parentElement.innerHTML = '';
    var featuresFragment = document.createDocumentFragment();

    userFeatures.forEach(function (feature) {
      listElements.forEach(function (element) {
        if (element.classList.contains('popup__feature--' + feature)) {
          featuresFragment.appendChild(element);
        }
      });
    });
    return parentElement.appendChild(featuresFragment);
  }

  function setPhotos(parentElement, photoItem, userPhotoList) {
    parentElement.innerHTML = '';
    var photosFragment = document.createDocumentFragment();

    userPhotoList.forEach(function (userPhoto) {
      var photo = photoItem.cloneNode(true);
      photo.src = userPhoto;
      photosFragment.appendChild(photo);
    });
    return parentElement.appendChild(photosFragment);
  }

  window.card = {
    create: function (ad) {
      var newCard = mapCardSimilar.cloneNode(true);
      var photosBlock = newCard.querySelector('.popup__photos');
      var photo = photosBlock.querySelector('img');
      var featuresBlock = newCard.querySelector('.popup__features');
      var featuresList = newCard.querySelectorAll('.popup__feature');

      newCard.querySelector('img').src = ad.author.avatar;
      newCard.querySelector('.popup__title').textContent = ad.offer.title;
      newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
      newCard.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
      newCard.querySelector('.popup__type').textContent = getHomeType(ad.offer.type);
      newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      newCard.querySelector('.popup__description').textContent = ad.offer.description;
      setFeatures(featuresBlock, featuresList, ad.offer.features);
      setPhotos(photosBlock, photo, ad.offer.photos);

      window.card.open(newCard);
    },

    open: function (newCard) {
      window.card.close();

      var cardFragment = document.createDocumentFragment().appendChild(newCard);
      map.insertBefore(cardFragment, mapFiltersContainer);

      document.querySelector('.popup__close').addEventListener('click', function () {
        window.card.close();
      });
      document.addEventListener('keydown', onPopupEscPress);
    },

    close: function () {
      var card = map.querySelector('.map__card');
      if (card) {
        card.parentNode.removeChild(card);
        document.removeEventListener('keydown', onPopupEscPress);
      }
    }
  };
})();
