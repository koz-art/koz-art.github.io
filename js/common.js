//check on resize

$(document).ready(function() {
  checkSize();
  $(window).resize(checkSize);
});

function checkSize(){
  if ($('.sandwich').css('display') == 'none') {
    $('.main-navigation').css({'display': 'block'});
  } else {
    $('.main-navigation').css({'display': 'none'});
  }
}

//big-menu-fixed
$(window).on('scroll', function() {
  if ($('.sandwich').css('display') == 'none') {
    if ($(this).scrollTop() > 82) {
      $('.main-navigation').addClass('main-navigation_fixed').fadeIn('fast');
    } else {
        $('.main-navigation').removeClass('main-navigation_fixed');
    }
  }
});

//sandwich-menu 
$('.sandwich').on('click', function() {
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    $('.main-navigation').fadeIn(500);
  } else {
    $('.main-navigation').fadeOut(500);
  }
});

//scrolling
$('a[href^="#"], a[href^="."]').on('click', function() {

  //sandwich-show-hide
  if ($('.sandwich').css('display') == 'block') {
    if ($('.main-navigation').css('display') == 'block') {
      $('.main-navigation').fadeOut(300);
      $('.sandwich').removeClass('active');
    }
  }

  var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href
  if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
  $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 700); // анимируем скроолинг к элементу scroll_el
  }
  return false; // выключаем стандартное действие
});

