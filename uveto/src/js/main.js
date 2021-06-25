/* eslint-disable func-names */
import handler from './handlers';
import navigation from '../components/burger-menu/burger-menu';
import tabs from '../components/tabs/tabs';

const page = document.querySelector('.home-page');
const header = document.querySelector('.header');
const tabsNav = document.querySelectorAll('.tabs__tab');
const tabsContent = document.querySelectorAll('.tabs__element');

header.addEventListener('click', function ({ target }) {
  if (target.closest('.burger-menu')) navigation.toggleNavigation.call(this, target, 'main');
});

if (page.querySelector('.carousel')) {
  const carousel = new Swiper('.carousel__container', {
    slidesPerView: 1,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: '.carousel > .button--toggler-right',
      prevEl: '.carousel > .button--toggler-left',
    },
    pagination: {
      el: '.carousel__pagination',
      clickable: true,
    },
  });
}

tabs.toggleTabs(tabsNav, tabsContent);
