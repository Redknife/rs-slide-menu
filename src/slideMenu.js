/* eslint-disable consistent-return */
import defaultSettings from './defaultSettings';
import template from './template';
import {
  isFunction,
  isNode,
  isElement,
  transitionend,
  prefixed,
  transform3dSupport,
} from './utils';

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

    if (isElement(el) || isNode(el)) {
      self.element = el;
    } else if (typeof el === 'string') {
      self.element = document.querySelector(el);
    } else {
      throw Error('Invalid arguments in slideMenu');
    }

    self.elementNextSibling = self.element.nextElementSibling || null;
    self.elementParent = self.element.parentNode;

    const templates = template(self.settings.prefix);
    self.wrap = templates.wrap;
    self.container = templates.container;
    self.backdrop = templates.backdrop;
    self.content = templates.content;

    self.togglers = document.querySelectorAll(self.settings.toggler);

    self.cb = {
      before: [],
      after: [],
    };

    self._setBaseStyles();
    self._initEvents();
  }

  _initEvents() {
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

  show() {
    const self = this;

    self.cb.before.forEach(cb => cb(self));

    self._mountElementToContent();

    document.body.insertBefore(self.wrap, document.body.firstChild);

    setTimeout(self._setShowStyles.bind(self), 15);

    document.body.classList.add(`${self.settings.prefix}-open`);
  }

  hide() {
    const self = this;

    self._setHiddenStyles();

    self.container.addEventListener(transitionend, function showTransitionEnd(e) {
      if (e.target === self.container) {
        self.wrap.remove();
        self._mountElementBack();
        e.target.removeEventListener(e.type, showTransitionEnd);
      }
    });

    document.body.classList.remove(`${self.settings.prefix}-open`);

    self.cb.after.forEach(cb => cb(self));
  }

  addBeforeCb(cb) {
    if (isFunction(cb)) {
      return this.cb.before.push(cb);
    }
  }

  addAfterCb(cb) {
    if (isFunction(cb)) {
      return this.cb.after.push(cb);
    }
  }

  _mountElementToContent() {
    const self = this;
    if (self._getElementDisplay() === 'none') {
      self.element.style.display = 'block';
    }
    self.content.appendChild(self.element);
  }

  _mountElementBack() {
    this.element.style.display = '';

    this.elementParent.insertBefore(this.element, this.elementNextSibling);
  }

  _getElementDisplay() {
    const self = this;
    const computedStyles = window.getComputedStyle(self.element);
    return computedStyles.getPropertyValue('display');
  }

  _setShowStyles() {
    this.backdrop.style.opacity = this.settings.bgOpacity;

    if (transform3dSupport) {
      this.container.style[prefixed('transform')] = 'translate3d(0, 0, 0)';
    } else {
      this.container.style[prefixed('transform')] = 'translateX(0)';
    }
  }

  _setHiddenStyles() {
    const hideTransformX = this.settings.hideTransformX;
    this.backdrop.style.opacity = '0';

    if (transform3dSupport) {
      this.container.style[prefixed('transform')] = `translate3d(${hideTransformX}, 0, 0)`;
    } else {
      this.container.style[prefixed('transform')] = `translateX(${hideTransformX})`;
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
    style[prefixed('transform')] = 'translate3d(0, 0, 0)';
    style[prefixed('transition')] = `${duration}ms visibility ${easing}`;
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
    style[prefixed('transform')] = 'translate3d(0, 0, 0)';
    style[prefixed('transition')] = `${duration}ms opacity ${easing}`;
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
    style[prefixed('boxSizing')] = 'border-box';
    style[prefixed('transition')] = `${duration}ms transform ${easing}`;
    style[prefixed('willChange')] = 'transform';
    if (transform3dSupport) {
      style[prefixed('transform')] = `translate3d(${this.settings.hideTransformX}, 0, 0)`;
    } else {
      style[prefixed('transform')] = `translateX(${this.settings.hideTransformX})`;
    }
  }

  _setBaseStyles() {
    this._setWrapBaseStyles();
    this._setBackdropBaseStyles();
    this._setContainerBaseStyles();
  }
}

