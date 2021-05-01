import navigation from '../components/burger-menu/burger-menu';
import popup from '../components/popup/popup';

const page = document.querySelector('.home-page');
const header = document.querySelector('.header');
const register = document.querySelector('.popup');
const title = register.querySelector('[class*=title]');

// Function add tag in element after word
function returnAfter(word, element) {
  const content = element.textContent.split(' ');
  element.textContent = '';

  content.forEach((item, index) => {
    if (item === word) content.splice(index + 1, 0, '<br/>');
  });

  return content.join(' ');
}

page.addEventListener('click', ({ target }) => {
  if (target.classList.contains('popup') || target.closest('.form__close')) popup.disablePopUp(register);
});

header.addEventListener('click', function ({ target }) {
  if (target.closest('.burger-menu')) navigation.toggleNavigation.call(this, target);
  if (target.closest('.button')) popup.enablePopUp(register);
});

// Fix the title for responsive design
title.insertAdjacentHTML('afterbegin', returnAfter('Регистрация', title));
