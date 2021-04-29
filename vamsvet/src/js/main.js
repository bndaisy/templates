import brgmenu from '../components/burger-menu/burger-menu';
import '../components/popup/popup';

const page = document.querySelector('.home-page');
const header = document.querySelector('.header');
const popup = document.querySelector('.popup');

function enableNavigation(target) {
  const navigation = document.querySelector('.nav__wrapper');
  const toggler = document.querySelector('.burger-menu');

  brgmenu(target, toggler, navigation);

  if (navigation.classList.contains('is-active')) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
}

const showPopUp = (element) => element.classList.add('is-active');
const hidePopUp = (element) => element.classList.remove('is-active');

header.addEventListener('click', ({ target }) => {
  enableNavigation(target);

  if (target.closest('.header__button')) showPopUp(popup);

  if (popup.classList.contains('is-active')) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
});

page.addEventListener('click', ({ target }) => {
  if (target.classList.contains('popup') || target.closest('.popup__close')) hidePopUp(popup);
});
