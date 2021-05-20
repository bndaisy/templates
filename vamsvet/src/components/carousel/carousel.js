/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

// Selectors
const CAROUSEL_CONTAINER = 'carousel__container';
const CAROUSEL_WRAPPER = 'carousel__wrapper';
const CAROUSEL_ELEMENT = 'carousel__element';
const CAROUSEL_CONTENT = 'carousel__content';
const CAROUSEL_TOGGLER_PREV = 'carousel__toggler-prev';
const CAROUSEL_TOGGLER_NEXT = 'carousel__toggler-next';
const CAROUSEL_INDICATOR = 'carousel__indicator';

class Carousel {
  constructor(selector, settings = {}) {
    this.options = {
      togglers: false,
      indicators: false,
      loop: false,
      autoplay: false,
      delay: 5000,
      swipe: false,
      perview: 1,
    };

    this.container = this.findElement(selector) || this.findElement(CAROUSEL_CONTAINER);
    this.wrapper = this.findElement(settings.wrapper, this.container) || this.findElement(CAROUSEL_WRAPPER, this.container);
    this.elements = this.findElements(settings.element, this.wrapper) || this.findElements(CAROUSEL_ELEMENT, this.wrapper);

    // Set options
    if (settings.options) this.__updateOptions(this.options, settings.options);

    // Set breakpoints
    if (settings.breakpoints) {
      this.breakpoints = Object.entries(settings.breakpoints).reduce((breakpoints, [breakpoint, value]) => {
        breakpoints[breakpoint] = value;

        return breakpoints;
      }, {});
    }

    // ! Rewrite setting togglers
    if (this.options.togglers && !settings.togglers) {
      this.togglers = {
        prev: this.createToggler(CAROUSEL_TOGGLER_PREV, 'arrow-left'),
        next: this.createToggler(CAROUSEL_TOGGLER_NEXT, 'arrow-right'),
      };
    }

    if (this.options.togglers && settings.togglers) {
      this.togglers.prev = this.findElement(settings.togglers.prev, this.carousel);
      this.togglers.next = this.findElement(settings.togglers.next, this.carousel);
    }

    if (this.options.indicators) {
      this.indicators = this.createIndicators(this.elements, this.options.perview, settings.indicator);
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
    return element.querySelector(`.${selector}`);
  }

  findElements(selector, element = document.documentElement) {
    if (!selector) return false;
    return [...element.querySelectorAll(`.${selector}`)];
  }

  setProportions() {
    const { width } = this.container.getBoundingClientRect();
    const paddingLeft = parseInt(window.getComputedStyle(this.container).paddingLeft, 10) || 0;
    const paddingRight = parseInt(window.getComputedStyle(this.container).paddingRight, 10) || 0;

    this.wrappedElements.forEach((element, index, array) => {
      element.style.width = this.options.swipe
        ? `${Math.floor(width - (width * 0.25))}px`
        : element.style.width = `${width - paddingLeft - paddingRight}px`;

      if (index !== array.length - 1) element.style.marginRight = `${paddingRight}px`;
    });

    this.wrapper.style.width = `${this.wrappedElements.reduce((acc, element) => {
      const marginRight = parseInt(element.style.marginRight, 10) || 0;

      acc += parseInt(element.style.width, 10) + marginRight;
      return acc;
    }, 0)}px`;
  }

  // Append wrapper to slides, based on perview
  getManagedContent() {
    const managedContent = this.elements.reduce((content, item, index) => {
      const element = Math.floor(index / this.options.perview);

      if (!content[element]) {
        const fragment = document.createElement('div');

        fragment.classList.add(CAROUSEL_CONTENT);

        content[element] = fragment;
      }

      content[element].append(item);

      return content;
    }, []);

    return managedContent;
  }

  renderingManagedContent() {
    this.wrappedElements = this.getManagedContent();

    if (this.wrapper.children) this.wrapper.innerHTML = '';

    this.wrappedElements.forEach((element) => this.wrapper.append(element));
  }

  // Create navigation
  createIndicators(elements, perview, selector = CAROUSEL_INDICATOR) {
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
  renderingIndicators() {
    const indicators = document.createElement('div');
    indicators.classList.add('carousel__indicators');

    this.indicators.forEach((indicator) => indicators.append(indicator));

    this.wrapper.insertAdjacentElement('afterend', indicators);
  }

  renderingTogglers() {
    Object.values(this.togglers).forEach((toggler) => this.container.insertAdjacentElement('afterend', toggler));
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

  reinitialize() {
    this.renderingManagedContent();
  }

  initialize() {
    if (this.breakpoints) {
      this.__mediaQueries = this.getMediaQueries(this.breakpoints);
      this.__device = this.getCurrentDevice(this.__mediaQueries);

      this.__updateOptions(this.options, this.breakpoints[this.__device]);

      window.addEventListener('resize', () => {
        const currentDevice = this.getCurrentDevice(this.__mediaQueries);

        if (this.__device !== currentDevice) {
          this.__device = currentDevice;

          this.__updateOptions(this.options, this.breakpoints[this.__device]);
          this.reinitialize();
        }

        this.setProportions();
      });
    }

    this.renderingManagedContent();

    this.__currentElement = 0;
    this.__elementsCount = this.wrappedElements.length;

    this.setProportions();

    if (this.__elementsCount <= 1) this.__disableNavigation();

    if (this.options.pagination) this.renderingPagination(this.indicators);
  }
}

export default Carousel;
