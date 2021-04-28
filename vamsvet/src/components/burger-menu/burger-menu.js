const toggleNavigation = (toggler, navigation) => {
  toggler.classList.toggle('is-active');
  navigation.classList.toggle('is-active');
};

export default (target, toggler, navigation) => {
  if (target.closest('.burger-menu')) toggleNavigation(toggler, navigation);
};
