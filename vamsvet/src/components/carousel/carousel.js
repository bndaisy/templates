/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class Carousel {
  constructor(selector, settings) {
    this.options = {
      togglers: true,
      pagination: false,
      loop: false,
      autoplay: false,
      delay: 5000,
      swipe: true,
      perview: 1,
    };

    this.breakpoints = {};

    this.togglers = {
      prev: this.createToggler('carousel__toggler-prev', 'arrow-left'),
      next: this.createToggler('carousel__toggler-next', 'arrow-right'),
    };

    this.carousel = this.findElement(selector) || this.findElement('.carousel');
    this.container = this.findElement(settings.container, this.carousel) || this.findElement('.carousel__container', this.carousel);
    this.elements = this.findElements(settings.element, this.container) || this.findElements('.carousel__element', this.container);

    if (settings.options) this.__updateOptions(this.options, settings.options);

    if (settings.breakpoints) {
      Object.entries(settings.breakpoints).forEach(([breakpoint, value]) => {
        this.breakpoints[breakpoint] = value;
      });
    }

    if (this.options.pagination) {
      this.indicators = this.createIndicators(this.elements, this.options.perview, settings.indicator);
    }

    if (settings.togglers) {
      this.togglers.prev = this.findElement(settings.togglers.prev, this.carousel);
      this.togglers.next = this.findElement(settings.togglers.next, this.carousel);
    }
  }

  __updateOptions(options, config) {
    Object.entries(config).forEach(([option, value]) => {
      if (Object.prototype.hasOwnProperty.call(options, option)) this.options[option] = value;
    });
  }

  __disableNavigation() {
    this.options.togglers = false;
    this.options.pagination = false;
  }

  isEmpty(object) {
    return JSON.stringify(object) === '{}';
  }

  findElement(selector, element = document.documentElement) {
    return element.querySelector(selector);
  }

  findElements(selector, element = document.documentElement) {
    if (!selector) return false;
    return [...element.querySelectorAll(selector)];
  }

  // Create navigation
  createIndicators(elements, perview, selector = 'carousel__indicator') {
    const indicatorsCount = Math.ceil(elements.length / perview);
    const indicators = [];

    for (let i = 0; i < indicatorsCount; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add(selector);

      indicators.push(indicator);
    }

    return indicators;
  }

  createToggler(selector, icon) {
    const toggler = document.createElement('div');
    toggler.classList.add(selector);

    toggler.insertAdjacentHTML('afterbegin',
      `<svg class="icon carousel__icon icon--${icon}">
        <use xlink:href="/svg/sprite.svg#${icon}"></use>
      </svg>`);

    return toggler;
  }

  // Rendering navigation
  renderingPagination(indicators) {
    const pagination = document.createElement('div');
    pagination.classList.add('carousel__indicators');

    indicators.forEach((indicator) => pagination.append(indicator));

    this.container.insertAdjacentElement('afterend', pagination);
  }

  renderingTogglers(togglers) {
    Object.values(togglers).forEach((toggler) => this.container.insertAdjacentElement('afterend', toggler));
  }

  // MediaQueries
  getMediaQueries(breakpoints) {
    const mediaQueries = Object.keys(breakpoints).reduce((acc, breakpoint, index, array) => {
      if (index === array.length - 1) acc[breakpoint] = [+breakpoint, 1920];
      else acc[breakpoint] = [+breakpoint, +array[index + 1]];

      return acc;
    }, {});

    return mediaQueries;
  }

  getCurrentDevice(mediaQueries) {
    let device;

    Object.entries(mediaQueries).forEach(([breakpoint, [start, end]]) => {
      if (window.innerWidth >= start && window.innerWidth < end) device = breakpoint;
    });

    return device;
  }

  initialize() {
    this.__elementsCount = this.elements.length;
    this.__currentElement = 0;

    if (this.__elementsCount <= 1) this.__disableNavigation();

    if (!this.isEmpty(this.breakpoints)) {
      this.__mediaQueries = this.getMediaQueries(this.breakpoints);
      this.__device = this.getCurrentDevice(this.__mediaQueries);

      this.__updateOptions(this.options, this.breakpoints[this.__device]);

      window.addEventListener('resize', () => {
        const currentDevice = this.getCurrentDevice(this.__mediaQueries);

        if (this.__device !== currentDevice) {
          this.__device = currentDevice;
          this.__updateOptions(this.options, this.breakpoints[this.__device]);
          // TODO: Create reinit to slider before main functions
          console.log('device is changed');
        }
      });
    }

    // TODO: Create main functions

    if (this.options.pagination) this.renderingPagination(this.indicators);
  }
}

export default Carousel;
