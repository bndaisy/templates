/* eslint-disable func-names */
import handler from './handlers';
import navigation from '../components/burger-menu/burger-menu';

const header = document.querySelector('.header');

header.addEventListener('click', function ({ target }) {
  if (target.closest('.burger-menu')) navigation.toggleNavigation.call(this, target, 'main');
});
