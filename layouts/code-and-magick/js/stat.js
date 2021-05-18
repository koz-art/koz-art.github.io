'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_GAP = 10;
  var TITLE_X = 220;
  var TITLE_Y = 25;
  var TITLE_GAP = 25;

  var COLUMN_WIDTH = 40;
  var COLUMN_HEIGHT = 150;
  var COLUMN_X = 150;
  var COLUMN_Y = 255;
  var COLUMN_GAP = 50;

  var FONT_GAP = 10;
  var NUMBER_GAP = 30;

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function getMaxElement(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  }

  window.renderStatistics = function (ctx, names, times) {
    // отрисовка окна с тенью
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    // отрисовка заголовка
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
    ctx.fillStyle = 'black';
    ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + TITLE_GAP);

    var maxTime = getMaxElement(times);

    // отрисовка графика
    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = 'rgba(0, 0,' + (Math.random() * 250).toFixed(0) + ',' + (Math.random() + 0.4).toFixed(1) + ')';
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * i, COLUMN_Y - FONT_GAP, COLUMN_WIDTH, COLUMN_HEIGHT * times[i] / maxTime * -1);
      ctx.fillText(names[i], COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * i, COLUMN_Y);
      ctx.fillText(times[i].toFixed(0), COLUMN_X + (COLUMN_WIDTH + COLUMN_GAP) * i, COLUMN_Y - (COLUMN_HEIGHT * times[i] / maxTime) - NUMBER_GAP);
    }
  };
})();
