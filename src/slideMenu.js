import defaultSettings from './defaultSettings';
import template from './template';
import utils from './utils';

export default class slideMenu {
  constructor(el, settings) {
    const self = this;

    self.settings = Object.assign({}, defaultSettings, settings);
    self.settings.zIndexContainer = self.settings.zIndex - 10;
    self.settings.zIndexBg = self.settings.zIndex - 20;

    if (self.settings.side === 'left') {
      self.settings.hideTransformX = '-100%';
    } else {
      self.settings.hideTransformX = '100%';
      self.settings.side = 'right';
    }

    if (utils.isElement(el) || utils.isNode(el)) {
      self.element = el;
    } else if (typeof el === 'string') {
      self.element = document.querySelector(el);
    } else {
      throw Error('Invalid arguments in slideMenu');
    }

    self.elementNextSibling = self.element.nextElementSibling;
    self.elementParent = self.element.parentNode;

    const templates = template(self.settings.prefix);
    self.wrap = templates.wrap;
    self.container = templates.container;
    self.backdrop = templates.backdrop;
    self.content = templates.content;

    self.togglers = document.querySelectorAll(self.settings.toggler);

    self._setBaseStyles();
    self.initEvents();
  }

  initEvents() {
    const self = this;
    const closeBtn = self.wrap.querySelector(`.${self.settings.prefix}-close`);

    self._togglerEventHandler = (e) => {
      e.preventDefault();

      self.show();
    };

    self._closeClickEventHandler = () => {
      self.hide();
    };

    [...self.togglers].forEach((toggler) => {
      toggler.addEventListener('click', self._togglerEventHandler);
    });

    self.backdrop.addEventListener('click', self._closeClickEventHandler);
    closeBtn.addEventListener('click', self._closeClickEventHandler);
  }

  destroy() {
    const self = this;
    const closeBtn = self.wrap.querySelector(`.${self.settings.prefix}-close`);

    self.hide();

    [...self.togglers].forEach((toggler) => {
      toggler.removeEventListener('click', self._togglerEventHandler);
    });

    self.backdrop.removeEventListener('click', self._closeClickEventHandler);
    closeBtn.removeEventListener('click', self._closeClickEventHandler);
  }

  mountElementToContent() {
    const self = this;
    if (self.getElementDisplay() === 'none') {
      self.element.style.display = 'block';
    }
    self.content.appendChild(self.element);
  }

  mountElementBack() {
    const self = this;

    if (!utils.isElement(self.elementNextSibling) || !utils.isElement(self.elementParent)) {
      throw new Error('Original mount point of element not found');
    }

    self.element.style.display = '';

    self.elementParent.insertBefore(self.element, self.elementNextSibling);
  }

  getElementDisplay() {
    const self = this;
    const computedStyles = window.getComputedStyle(self.element);
    return computedStyles.getPropertyValue('display');
  }

  show() {
    const self = this;

    self.mountElementToContent();

    document.body.insertBefore(self.wrap, document.body.firstChild);

    setTimeout(self._setShowStyles.bind(self), 15);

    document.body.classList.add(`${self.settings.prefix}-open`);
  }

  hide() {
    const self = this;

    self._setHiddenStyles();

    self.container.addEventListener(utils.transitionend, function showTransitionEnd(e) {
      if (e.target === self.container) {
        self.wrap.remove();
        self.mountElementBack();
        e.target.removeEventListener(e.type, showTransitionEnd);
      }
    });

    document.body.classList.remove(`${self.settings.prefix}-open`);
  }

  _setShowStyles() {
    this.backdrop.style.opacity = this.settings.bgOpacity;

    if (utils.transform3dSupport) {
      this.container.style[utils.prefixed('transform')] = 'translate3d(0, 0, 0)';
    } else {
      this.container.style[utils.prefixed('transform')] = 'translateX(0)';
    }
  }

  _setHiddenStyles() {
    const hideTransformX = this.settings.hideTransformX;
    this.backdrop.style.opacity = '0';

    if (utils.transform3dSupport) {
      this.container.style[utils.prefixed('transform')] = `translate3d(${hideTransformX}, 0, 0)`;
    } else {
      this.container.style[utils.prefixed('transform')] = `translateX(${hideTransformX})`;
    }
  }

  _setWrapBaseStyles() {
    const style = this.wrap.style;
    const { duration, easing } = this.settings.animation;

    style.position = 'fixed';
    style.left = '0';
    style.top = '0';
    style.width = '100%';
    style.height = '100%';
    style.overflow = 'hidden';
    style.zIndex = this.settings.zIndex;
    style[utils.prefixed('transform')] = 'translate3d(0, 0, 0)';
    style[utils.prefixed('transition')] = `${duration}ms visibility ${easing}`;
  }

  _setBackdropBaseStyles() {
    const style = this.backdrop.style;
    const { duration, easing } = this.settings.animation;

    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.width = '100%';
    style.height = '100%';
    style.background = this.settings.bgColor;
    style.opacity = '0';
    style.zIndex = this.settings.zIndexBg;
    style[utils.prefixed('transform')] = 'translate3d(0, 0, 0)';
    style[utils.prefixed('transition')] = `${duration}ms opacity ${easing}`;
  }

  _setContainerBaseStyles() {
    const style = this.container.style;
    const { duration, easing } = this.settings.animation;

    if (typeof this.settings.width === 'string') {
      style.width = this.settings.width;
    } else if (typeof this.settings.width === 'number') {
      style.width = `${this.settings.width}px`;
    }
    if (this.settings.side === 'right') {
      style.cssFloat = 'right';
    }
    style.zIndex = this.settings.zIndexContainer;
    style.height = '100%';
    style.overflowX = 'hidden';
    style.overflowY = 'auto';
    style.position = 'relative';
    style[utils.prefixed('boxSizing')] = 'border-box';
    style[utils.prefixed('transition')] = `${duration}ms transform ${easing}`;
    style[utils.prefixed('willChange')] = 'transform';
    if (utils.transform3dSupport) {
      style[utils.prefixed('transform')] = `translate3d(${this.settings.hideTransformX}, 0, 0)`;
    } else {
      style[utils.prefixed('transform')] = `translateX(${this.settings.hideTransformX})`;
    }
  }

  _setBaseStyles() {
    this._setWrapBaseStyles();
    this._setBackdropBaseStyles();
    this._setContainerBaseStyles();
  }
}

