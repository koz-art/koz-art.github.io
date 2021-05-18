'use strict';

(function () {

  // Изменения свойств персонажа по нажатию
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputHiddenCoatColor = setup.querySelector('#input-hidden-coat-color');
  var inputHiddenEyesColor = setup.querySelector('#input-hidden-eyes-color');
  var inputHiddenFireballColor = setup.querySelector('#input-hidden-fireball-color');

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215,' +
  ' 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.colorize(wizardCoat, COAT_COLORS, inputHiddenCoatColor, window.wizard.onCoatChange);
  window.colorize(wizardEyes, EYES_COLORS, inputHiddenEyesColor, window.wizard.onEyesChange);
  window.colorize(wizardFireball, FIREBALL_COLORS, inputHiddenFireballColor);

  function onSuccessLoad(data) {
    window.updateWizards(data);
  }

  function onSuccessUpload() {
    window.closePopup();
  }

  function onErrorEvent(errorMessage) {
    window.error(errorMessage);
  }

  window.backend.load(onSuccessLoad, onErrorEvent);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccessUpload, onErrorEvent);
  });
})();
