import * as navigation from '../components/nav/nav';
import * as icon from '../components/icon/icon';
import * as variables from './variables/variables';
import toggleBurger from '../components/burger-menu/burger-menu';

// ! Провести рефакторинг

// Activate brg-menu

const brgmenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.header__nav');
const header = brgmenu.parentElement;

const socials = [
  {
    value: icon.renderingIcon(variables.icons.facebook),
    attributes: {
      href: '#'
    }
  },
  {
    value: icon.renderingIcon(variables.icons.vkontakte),
    attributes: {
      href: '#'
    }
  },
  {
    value: icon.renderingIcon(variables.icons.instagram),
    attributes: {
      href: '#'
    }
  }
];

const phones = [
  {
    value: '8 (800) 333-55-99',
    attributes: {
      href: 'tel:+78003335599'
    }
  }
];


export default brgmenu.addEventListener('click', ({ target }) => {
  toggleBurger(brgmenu, nav);
  recolorNavigation(
    target,
    variables.palette['palette__accent--secondary'],
    header,
    nav);

  if (brgmenu.classList.contains('is-active')) {
    document.body.style.overflow = 'hidden';

    navigation.renderingDynamicNavigationElement(nav.firstElementChild, phones);
    navigation.renderingDynamicNavigationElement(nav.firstElementChild, socials);
  } else {
    document.body.style.overflow = 'visible';

    deleteElements(nav.firstElementChild, '--dynamic');
  }
});

const recolorNavigation = (target, color, ...elems) => {
  elems.forEach(elem => elem.style.backgroundColor = target.classList.contains('is-active') ||
    target.parentElement.classList.contains('is-active') ?
    color :
    variables.palette['palette__background--primary'])
};

const deleteElements = (parentElement, subString) => {
    let elements = [...parentElement.children];

    elements.forEach(element => {
        if ([...element.classList].join().includes(`${subString}`)) element.remove();
    })
}



