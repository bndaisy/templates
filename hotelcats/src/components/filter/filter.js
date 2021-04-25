const content = document.querySelector('.content');


export default content.addEventListener('click', function (event) {
  const { target } = event;

  toggleFilterPopUp(this, target);
  resetFilter(this, event);
})

const toggleFilterPopUp = (that, target) => {
  const filter = that.querySelector('.filter') || document.querySelector('.filter');

  if (target.closest('.toggler--filter')) showFilter(filter);
  if (target.classList.contains('filter') || target.closest('.filter__close')) hideFilter(filter);
}

const showFilter = (popup) => popup.style.display = 'block';

const hideFilter = (popup) => popup.style.display = 'none';

const resetFilter = (that, event) => {
  const filter = that.querySelector('.filter__form') || document.querySelector('.filter__form');

  if (event.target.classList.contains('button--fill-none')) {
    event.preventDefault();
    filter.reset();
  }
}
