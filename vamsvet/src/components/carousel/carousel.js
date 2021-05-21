/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

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

    this.selectors = {
      container: selector || 'carousel__container',
      content: settings.content || 'carousel__content',
      slide: settings.slide || 'carousel__slide',
      element: settings.element || 'carousel__element',
      indicator: settings.indicator || 'carousel__indicator',
      togglers: {
        prev: settings.togglers?.prev || 'carousel__toggler-prev',
        next: settings.togglers?.next || 'carousel__toggler-next',
      },
    };

    this.container = this.findElement(this.selectors.container);
    this.content = this.findElement(this.selectors.content, this.container);
    this.elements = this.findElements(this.selectors.element, this.content);

    if (!this.__isEmptyObject(settings.togglers)) {
      this.togglers = {
        prev: this.findElement(settings.togglers.prev, this.container),
        next: this.findElement(settings.togglers.next, this.container),
      };
    }

    // Update options
    if (!this.__isEmptyObject(settings.options)) this.__updateOptions(settings.options);

    // Set breakpoints
    if (!this.__isEmptyObject(settings.breakpoints)) this.__createObject('breakpoints', settings.breakpoints);
  }

  __createObject(object, config) {
    this[object] = Object.entries(config).reduce((keys, [key, value]) => {
      keys[key] = value;

      return keys;
    }, {});
  }

  __updateOptions(config) {
    Object.entries(config).forEach(([option, value]) => {
      if (Object.prototype.hasOwnProperty.call(this.options, option)) this.options[option] = value;
    });
  }

  __disableNavigation() {
    this.options.togglers = false;
    this.options.pagination = false;
  }

  __enableToggler(toggler, callback) {
    toggler.addEventListener('click', callback);
  }

  __disableToggler(toggler, listener) {
    toggler.removeEventListener('click', listener);
    console.log('ok')
  }

  __enableIndicators() {
    this.indicators.forEach((indicator, index) => indicator.addEventListener('click', () => this.changeElement(index)));
  }

  findElement(selector, element = document.documentElement) {
    return element.querySelector(`.${selector}`);
  }

  findElements(selector, element = document.documentElement) {
    if (!selector) return false;
    return [...element.querySelectorAll(`.${selector}`)];
  }

  __isEmptyObject(object) {
    return JSON.stringify(object) === '{}';
  }

  __parseInt(value) {
    return parseInt(value, 10);
  }

  setProportions() {
    const { width } = this.container.getBoundingClientRect();
    const paddingLeft = parseInt(window.getComputedStyle(this.container).paddingLeft, 10);
    const paddingRight = parseInt(window.getComputedStyle(this.container).paddingRight, 10);

    this.__slides.forEach((slide) => {
      slide.style.width = this.options.swipe
        ? `${Math.floor(width - (width * 0.25))}px`
        : slide.style.width = `${width - paddingLeft - paddingRight}px`;

      slide.style.marginRight = `${paddingRight}px`;
    });

    this.content.style.width = `${this.__slides.reduce((acc, slide) => {
      const width = parseInt(slide.style.width, 10);
      const marginRight = parseInt(slide.style.marginRight, 10);

      acc += width + marginRight;

      return acc;
    }, 0)}px`;

    return parseInt(this.content.style.width, 10);
  }

  // Append wrapper to slides, based on perview
  createSlides() {
    const slides = this.elements.reduce((content, item, index) => {
      const element = Math.floor(index / this.options.perview);

      if (!content[element]) {
        const fragment = document.createElement('div');

        fragment.classList.add(this.selectors.slide);

        content[element] = fragment;
      }

      content[element].append(item);

      return content;
    }, []);

    return slides;
  }

  renderingSlides() {
    if (this.content.children) this.content.innerHTML = '';
    this.__slides.forEach((element) => this.content.append(element));
  }

  // Create navigation
  createIndicators() {
    const indicators = [];

    for (let i = 0; i < this.__slidesCount; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add(this.selectors.indicator);

      indicators.push(indicator);
    }

    indicators[this.__currentSlide].classList.add('is-active');

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
    this.content.insertAdjacentElement('afterend', indicators);
  }

  renderingTogglers() {
    Object.values(this.togglers).forEach((toggler) => this.container.insertAdjacentElement('afterend', toggler));
  }

  // MediaQueries
  getMediaQueries(breakpoints) {
    return Object.keys(breakpoints).reduce((acc, breakpoint, index, array) => {
      if (index === array.length - 1) acc[breakpoint] = [+breakpoint, 1920];
      else acc[breakpoint] = [+breakpoint, +array[index + 1]];

      return acc;
    }, {});
  }

  getCurrentDevice(mediaQueries) {
    let device;

    Object.entries(mediaQueries).forEach(([breakpoint, [start, end]]) => {
      if (window.innerWidth >= start && window.innerWidth < end) device = breakpoint;
    });

    return device;
  }

  prevElement(event, index = 1) {
    this.__currentSlide -= index;

    if (this.__currentSlide < 0) this.__currentSlide = this.__slidesCount - 1;
    if (!this.options.loop) {
      this.switchTogglers();
      this.switchIndicators();
    }
    this.content.style.transition = '.7s ease-in-out';
    this.content.style.transform = `translateX(-${this.__slidesLineWidth / this.__slidesCount * this.__currentSlide}px)`;
  }

  nextElement(event, index = 1) {
    this.__currentSlide += index;

    if (this.__currentSlide === this.__slidesCount) this.__currentSlide = 0;
    if (!this.options.loop) {
      this.switchTogglers();
      this.switchIndicators();
    }
    this.content.style.transition = '.7s ease-in-out';
    this.content.style.transform = `translateX(-${this.__slidesLineWidth / this.__slidesCount * this.__currentSlide}px)`;
  }

  switchIndicators() {
    this.indicators.forEach((indicator) => indicator.classList.remove('is-active'));
    this.indicators[this.__currentSlide].classList.add('is-active');
  }

  switchTogglers() {
    if (this.__currentSlide === 0) {
      this.__disableToggler(this.togglers.prev, this.prevElement);
    }
    if (this.__currentSlide === this.__slidesCount - 1) {
      this.__disableToggler(this.togglers.next, this.nextElement);
    }
  }

  changeElement(index) {
    this.__currentSlide = index;
    this.switchIndicators.call(this);
    this.content.style.transform = `translateX(-${this.__width / this.__slidesCount * this.__currentSlide}px)`;
  }

  reinitialize() {
    this.__slides = this.createSlides();
    this.renderingSlides(this.__slides);
  }

  initialize() {
    if (this.breakpoints) {
      this.__mediaQueries = this.getMediaQueries(this.breakpoints);
      this.__device = this.getCurrentDevice(this.__mediaQueries);

      this.__updateOptions(this.breakpoints[this.__device]);

      window.addEventListener('resize', () => {
        const currentDevice = this.getCurrentDevice(this.__mediaQueries);

        if (this.__device !== currentDevice) {
          this.__device = currentDevice;

          this.__updateOptions(this.breakpoints[this.__device]);
          this.reinitialize();
        }

        this.__slidesLineWidth = this.setProportions();
      });
    }

    this.__currentSlide = 0;
    this.__slides = this.createSlides();
    this.__slidesCount = this.__slides.length;

    this.renderingSlides(this.__slides);
    this.__slidesLineWidth = this.setProportions();

    if (this.__slidesCount <= 1) this.__disableNavigation();

    if (this.options.indicators) {
      this.indicators = this.createIndicators();
      this.renderingIndicators();
      this.__enableIndicators();
    }

    if (this.options.togglers && !this.togglers) {
      this.togglers = {
        prev: this.createToggler(this.selectors.togglers.prev, 'arrow-left'),
        next: this.createToggler(this.selectors.togglers.next, 'arrow-right'),
      };
      this.renderingTogglers();
    }

    if (this.options.togglers) {
      this.__enableToggler(this.togglers.prev, this.prevElement.bind(this));
      this.__enableToggler(this.togglers.next, this.nextElement.bind(this));
    }
  }
}

export default Carousel;
