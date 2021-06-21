function enableNavigation(toggler, navigation) {
  toggler.classList.add('is-active');
  navigation.classList.add('is-active');

  document.body.style.overflow = 'hidden';
}

function disableNavigation(toggler, navigation) {
  toggler.classList.remove('is-active');
  navigation.classList.remove('is-active');

  document.body.style.overflow = 'visible';
}

function toggleNavigation(target, className) {
  const toggler = target.closest('.burger-menu');
  const navigation = this.querySelector(`[class*="${className}"]`);

  if (navigation.classList.contains('is-active')) disableNavigation(toggler, navigation);
  else enableNavigation(toggler, navigation);
}

export default { toggleNavigation };
