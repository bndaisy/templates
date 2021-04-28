import brgmenu from '../components/burger-menu/burger-menu';

const header = document.querySelector('.header');

function enableNavigation({ target }) {
  const navigation = this.querySelector('.nav__wrapper');
  const toggler = this.querySelector('.burger-menu');

  brgmenu(target, toggler, navigation);
}

header.addEventListener('click', enableNavigation);
