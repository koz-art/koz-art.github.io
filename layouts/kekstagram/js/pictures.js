'use strict';
window.pictures = (function () {
  var pictures = [];
  var DATA_URL = 'data';
  var templateElement = document.querySelector('#picture-template');
  var elementToClone = templateElement.content.querySelector('.picture');
  var parentNodeForAdd = document.querySelector('.pictures');
  var picturesFilters = document.querySelector('.filters');

  var loadData = function (onDataLoaded) {
    window.load(DATA_URL, function (data) {
      pictures = JSON.parse(data);

      if (({}).toString.call(onDataLoaded) === '[object Function]') {
        onDataLoaded(pictures);
      }
    });
  };

  var renderPictures = function (loadedPictures) {
    var fragment = document.createDocumentFragment();
    parentNodeForAdd.innerHTML = '';

    loadedPictures.forEach(function (item) {
      var newElement = elementToClone.cloneNode(true);

      newElement.querySelector('img').setAttribute('src', item.url);
      newElement.querySelector('.picture-likes').innerText = item.likes;
      newElement.querySelector('.picture-comments').innerText = item.comments.length;

      newElement.addEventListener('click', function (event) {
        event.preventDefault();
        window.showGallery(item);
      });

      fragment.appendChild(newElement);
    });

    parentNodeForAdd.appendChild(fragment);
  };

  var choosePicturesFilter = function (value) {
    var FILTER_NEW = 'new';
    var FILTER_DISCUSSED = 'discussed';
    var FILTER_POPULAR = 'popular';
    var newPictures = [];
    var copiedPictures = pictures.slice();

    switch (value) {
      case FILTER_NEW:
        for (var i = 0; i < 10; i++) {
          var index = window.utils.getRandomIndex(copiedPictures);
          newPictures = newPictures.concat(copiedPictures[index]);
          copiedPictures.splice(index, 1);
        }
        break;

      case FILTER_DISCUSSED:
        newPictures = copiedPictures.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        break;

      case FILTER_POPULAR:
      default:
        newPictures = copiedPictures;
    }

    renderPictures(newPictures);
  };

  var picturesFiltersChangeHandler = function (event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'input' && target.classList.contains('filters-radio')) {
      choosePicturesFilter(target.getAttribute('value'));
    }
  };

  var showPicturesFilters = function () {
    picturesFilters.classList.remove('hidden');
    picturesFilters.addEventListener('change', picturesFiltersChangeHandler);
    picturesFilters.addEventListener('keyup', window.utils.enterKeyHandler);
  };

  loadData(renderPictures);
  showPicturesFilters();
})();
