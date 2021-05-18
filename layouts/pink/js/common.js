var menu = document.getElementById('nav');

menu.classList.remove('main-nav--opened');
menu.classList.add('main-nav--closed');

// document.getElementById('price-slider').scrollLeft = (document.querySelector('#price-slider table').offsetWidth / 2 - 20);

document.querySelector('.js-toggleMenu').addEventListener('click', function(e){
  // var menu = document.querySelector('.js-nav');

  if (menu.classList.contains('main-nav--opened')) {
    menu.classList.remove('main-nav--opened');
    menu.classList.add('main-nav--closed');
  } else {
    menu.classList.remove('main-nav--closed');
    menu.classList.add('main-nav--opened');
  }

  // menu.classList.toggle('main-nav--opened');
});
