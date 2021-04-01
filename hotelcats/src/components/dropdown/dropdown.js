/* eslint-disable no-param-reassign */

export default (dropdown, toggler) => {
  toggler.addEventListener('click', () => {
    if (dropdown.style.maxHeight) dropdown.style.maxHeight = null;
    dropdown.classList.toggle('is-active');
    dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
  });
};
