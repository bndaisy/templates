import brgmenu from '../components/burger-menu/burger-menu';
import { showPopUp, hidePopUp } from '../components/popup/popup';

const header = document.querySelector('.header');

function enableNavigation({ target }) {
  const navigation = document.querySelector('.nav__wrapper');
  const toggler = document.querySelector('.burger-menu');

  brgmenu(target, toggler, navigation);

  if (navigation.classList.contains('is-active')) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
}

function enablePopUp({ target }) {
  const popup = document.querySelector('.popup');

  if (target.closest('.header__button')) showPopUp(popup);
  if (target.classList.contains('popup') || target.closest('.popup__close')) hidePopUp(popup);

  if (popup.classList.contains('is-active')) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
}

header.addEventListener('click', function (event) {
  enableNavigation(event);
  enablePopUp(event);
});
