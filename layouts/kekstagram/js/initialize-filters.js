'use strict';
(function () {
  window.initializeFilters = function (filterElement) {
    var filterImagePreview = document.querySelector('.filter-image-preview');
    var FilterInitializer = {};
    var lastSelectedClass;

    var applyFilter = function (newFilter, oldFilter) {
      filterImagePreview.classList.remove(oldFilter);
      filterImagePreview.classList.add(newFilter);
    };

    var filterElementChangeHandler = function (event) {
      var target = event.target;

      if (target.tagName.toLowerCase() === 'input' && target.getAttribute('name') === 'upload-filter') {
        var classToAdd = target.getAttribute('id').slice(7);

        applyFilter(classToAdd, lastSelectedClass);
        lastSelectedClass = classToAdd;
      }
    };

    FilterInitializer.enable = function () {
      filterElement.addEventListener('change', filterElementChangeHandler);
      filterElement.addEventListener('keyup', window.utils.enterKeyHandler);
    };

    FilterInitializer.disable = function () {
      filterElement.removeEventListener('change', filterElementChangeHandler);
      filterElement.removeEventListener('keyup', window.utils.enterKeyHandler);
    };

    return FilterInitializer;
  };
})();
