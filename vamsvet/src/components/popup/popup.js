function enablePopUp(popup) {
  popup.classList.add('is-active');

  document.body.style.overflow = 'hidden';
}

function disablePopUp(popup) {
  popup.classList.remove('is-active');

  document.body.style.overflow = 'visible';
}

export default {
  enablePopUp,
  disablePopUp,
};
