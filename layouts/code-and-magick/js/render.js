'use strict';

(function () {
  window.render = function (wizardsData) {
    var NUMBER_OF_ELEMENTS = 4;
    var similarWizard = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var similarWizardsBlock = document.querySelector('.setup-similar');
    var similarWizardsList = similarWizardsBlock.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    function renderWizard(wizard) {
      var wizardItem = similarWizard.cloneNode(true);

      wizardItem.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardItem.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardItem.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardItem;
    }

    for (var i = 0; i < NUMBER_OF_ELEMENTS; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    window.utils.clearParentFromNodes(similarWizardsList);
    similarWizardsList.appendChild(fragment);
    similarWizardsBlock.classList.remove('hidden');
  };
})();
