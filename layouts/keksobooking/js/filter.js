'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filtersSelectList = filtersForm.querySelectorAll('.map__filter, .map__checkbox');

  var filterMap = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };
  var filterState = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var adsData = [];

  function evaluatePrice(value) {
    var answer = 'middle';
    if (value <= 10000) {
      answer = 'low';
    }
    if (value >= 50000) {
      answer = 'high';
    }
    return answer;
  }

  function applyFilter() {
    var adsFiltered = adsData.slice();
    var filterValue;

    for (var key in filterState) {
      if (filterState[key] !== 'any' && key !== 'features') {
        adsFiltered = adsFiltered.filter(function (ad) {

          filterValue = ad.offer[key] === filterState[key];

          if (key === 'price') {
            filterValue = evaluatePrice(ad.offer[key]) === filterState[key];
          }

          if (key === 'rooms' || key === 'guests') {
            filterValue = ad.offer[key] === parseInt(filterState[key], 10);
          }

          return filterValue;
        });
      }
    }

    function featuresFilter(stateFilter, ad) {
      var featuresFiltered = stateFilter.features.filter(function (feature) {
        return ad.offer.features.indexOf(feature) !== -1;
      });
      return featuresFiltered.length === stateFilter.features.length;
    }

    adsFiltered = adsFiltered.filter(function (ad) {
      return featuresFilter(filterState, ad);
    });

    return window.pins.render(adsFiltered);
  }

  function checkFeatures() {
    var featuresChecked = filtersForm.querySelectorAll('input:checked');
    filterState.features = [];

    featuresChecked.forEach(function (node) {
      filterState.features.push(node.value);
    });
  }

  function onFilterChange(evt) {
    if (evt.target.type !== 'checkbox') {
      filterState[filterMap[evt.target.name]] = evt.target.value;
    }
    checkFeatures();
    window.card.close();
    window.utils.debounce(applyFilter());
  }

  window.filter = {
    start: function (data) {
      adsData = data;
      filtersSelectList.forEach(function (filter) {
        filter.addEventListener('change', onFilterChange);
      });
    },

    stop: function () {
      filtersSelectList.forEach(function (filter) {
        filter.removeEventListener('change', onFilterChange);
      });
    }
  };
})();
