import brgmenu from '../components/burger-menu/burger-menu';

const header = document.querySelector('.header');

function enableNavigation({ target }) {
  const navigation = this.querySelector('.nav__wrapper');
  const toggler = this.querySelector('.burger-menu');

  brgmenu(target, toggler, navigation);

  if (navigation.classList.contains('is-active')) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
}

header.addEventListener('click', enableNavigation);
