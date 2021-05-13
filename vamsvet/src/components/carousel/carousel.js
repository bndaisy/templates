export default class Carousel {
  constructor(selector, settings) {
    this.options = {
      togglers: false,
      indicators: false,
      loop: false,
      autoplay: false,
      interval: 5000,
    };

    this.carousel = selector || '.carousel';
    this.container = settings.container || '.carousel__container';
    this.element = settings.element || '.carousel__element';

    if (settings.togglers) {
      this.options.togglers = true;
      this.prev = settings.prev || '.carousel__togler-left';
      this.next = settings.next || '.carousel__toggler-right';
    }

    if (settings.indicators) {
      this.options.indicators = true;
      this.indicatorElement = settings.indicatorElement || '.carousel__indicator';
    }

    if (settings.loop) this.options.loop = true;
  }

  findElement(selector, element = document.documentElement) {
    return element.querySelector(selector);
  }

  findElements(selector, element = document.documentElement) {
    return [...element.querySelectorAll(selector)];
  }

}
