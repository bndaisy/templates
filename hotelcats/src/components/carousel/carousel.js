if (document.querySelector('.carousel')) {
  const rooms = new Swiper('.carousel--rooms > .carousel__wrapper', {
    wrapperClass: 'carousel__container',
    slideClass: 'carousel__rooms-card',
    navigation: {
      nextEl: '.button--toggler-right',
      prevEl: '.button--toggler-left',
    },
    pagination: {
      el: '.carousel__indicators',
      type: 'bullets',
      clickable: true,
      bulletClass: 'carousel__indicator',
      bulletActiveClass: 'is-active'
    },
    slidePerView: 1,
    spaceBetween: 32
  });

  const comments = new Swiper('.carousel--comments > .carousel__wrapper', {
    wrapperClass: 'carousel__container',
    slideClass: 'carousel__comments-card',
    navigation: {
      nextEl: '.button--toggler-right',
      prevEl: '.button--toggler-left',
    },
    pagination: {
      el: '.carousel__indicators',
      type: 'bullets',
      clickable: true,
      bulletClass: 'carousel__indicator',
      bulletActiveClass: 'is-active'
    },
    slidesPerView: 'auto',
    spaceBetween: 32,
    centeredSlides: true
  });
}

