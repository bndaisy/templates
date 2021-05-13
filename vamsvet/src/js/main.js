import handler from './handlers';
import navigation from '../components/burger-menu/burger-menu';
import popup from '../components/popup/popup';
import Carousel from '../components/carousel/carousel';

const page = document.querySelector('.home-page');
const header = document.querySelector('.header');

const banner = page.querySelector('.banner');
const subscribe = page.querySelector('.subscribe');
const subscribeTitle = subscribe.querySelector('[class*=title]');
const register = document.querySelector('.popup');
const registerTitle = register.querySelector('[class*=title]');

page.addEventListener('click', ({ target }) => {
  if (target.classList.contains('popup') || target.closest('.form__close')) popup.disablePopUp(register);
});

header.addEventListener('click', function ({ target }) {
  if (target.closest('.burger-menu')) navigation.toggleNavigation.call(this, target);
  if (target.closest('.button')) popup.enablePopUp(register);
});

// Fix the banner textline for coloring
banner.querySelectorAll('[class*=textline]')
  .forEach((textline) => {
    if (textline.textContent.includes('ВамСвет.Дизайн')) textline.insertAdjacentHTML('afterbegin', handler.insertTag(textline, 'ВамСвет.Дизайн', 'span', 'banner__fragment--accent'));
  });

subscribeTitle.insertAdjacentHTML('afterbegin', handler.insertTag(subscribeTitle, 'ВамСвет.Дизайн', 'span', 'subscribe__fragment--accent'));

// Fix the title for responsive design
registerTitle.insertAdjacentHTML('afterbegin', handler.insertTag(registerTitle, 'Регистрация', 'br'));

const carousel = new Carousel('.content__carousel', {});
