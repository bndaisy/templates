import navigation from '../components/burger-menu/burger-menu';
import popup from '../components/popup/popup';

const page = document.querySelector('.home-page');
const header = document.querySelector('.header');
const register = document.querySelector('.popup');

page.addEventListener('click', ({ target }) => {
  if (target.classList.contains('popup') || target.closest('.popup__close')) popup.disablePopUp(register);
});

header.addEventListener('click', function ({ target }) {
  if (target.closest('.burger-menu')) navigation.toggleNavigation.call(this, target);
  if (target.closest('.button')) popup.enablePopUp(register);
});
