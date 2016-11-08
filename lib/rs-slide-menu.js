(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SlideMenu", [], factory);
	else if(typeof exports === 'object')
		exports["SlideMenu"] = factory();
	else
		root["SlideMenu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Menu = undefined;
	exports.init = init;

	var _slideMenu = __webpack_require__(2);

	var _slideMenu2 = _interopRequireDefault(_slideMenu);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Menu = exports.Menu = _slideMenu2.default;

	function init(el, settings) {
	  return new _slideMenu2.default(el, settings);
	}

	exports.default = Menu;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable consistent-return */


	var _defaultSettings = __webpack_require__(3);

	var _defaultSettings2 = _interopRequireDefault(_defaultSettings);

	var _template = __webpack_require__(4);

	var _template2 = _interopRequireDefault(_template);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var slideMenu = function () {
	  function slideMenu(el, settings) {
	    _classCallCheck(this, slideMenu);

	    var self = this;

	    self.settings = Object.assign({}, _defaultSettings2.default, settings);
	    self.settings.zIndexContainer = self.settings.zIndex - 10;
	    self.settings.zIndexBg = self.settings.zIndex - 20;

	    if (self.settings.side === 'left') {
	      self.settings.hideTransformX = '-100%';
	    } else {
	      self.settings.hideTransformX = '100%';
	      self.settings.side = 'right';
	    }

	    if ((0, _utils.isElement)(el) || (0, _utils.isNode)(el)) {
	      self.element = el;
	    } else if (typeof el === 'string') {
	      self.element = document.querySelector(el);
	    } else {
	      throw Error('Invalid arguments in slideMenu');
	    }

	    self.elementNextSibling = self.element.nextElementSibling || null;
	    self.elementParent = self.element.parentNode;

	    var templates = (0, _template2.default)(self.settings.prefix);
	    self.wrap = templates.wrap;
	    self.container = templates.container;
	    self.backdrop = templates.backdrop;
	    self.content = templates.content;

	    self.togglers = document.querySelectorAll(self.settings.toggler);

	    self.cb = {
	      before: [],
	      after: []
	    };

	    self._setBaseStyles();
	    self._initEvents();
	  }

	  _createClass(slideMenu, [{
	    key: '_initEvents',
	    value: function _initEvents() {
	      var self = this;
	      var closeBtn = self.wrap.querySelector('.' + self.settings.prefix + '-close');

	      self._togglerEventHandler = function (e) {
	        e.preventDefault();

	        self.show();
	      };

	      self._closeClickEventHandler = function () {
	        self.hide();
	      };

	      [].concat(_toConsumableArray(self.togglers)).forEach(function (toggler) {
	        toggler.addEventListener('click', self._togglerEventHandler);
	      });

	      self.backdrop.addEventListener('click', self._closeClickEventHandler);
	      closeBtn.addEventListener('click', self._closeClickEventHandler);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var self = this;
	      var closeBtn = self.wrap.querySelector('.' + self.settings.prefix + '-close');

	      self.hide();

	      [].concat(_toConsumableArray(self.togglers)).forEach(function (toggler) {
	        toggler.removeEventListener('click', self._togglerEventHandler);
	      });

	      self.backdrop.removeEventListener('click', self._closeClickEventHandler);
	      closeBtn.removeEventListener('click', self._closeClickEventHandler);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      var self = this;

	      self.cb.before.forEach(function (cb) {
	        return cb(self);
	      });

	      self._mountElementToContent();

	      document.body.insertBefore(self.wrap, document.body.firstChild);

	      setTimeout(self._setShowStyles.bind(self), 15);

	      document.body.classList.add(self.settings.prefix + '-open');
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var self = this;

	      self._setHiddenStyles();

	      self.container.addEventListener(_utils.transitionend, function showTransitionEnd(e) {
	        if (e.target === self.container) {
	          self.wrap.remove();
	          self._mountElementBack();
	          e.target.removeEventListener(e.type, showTransitionEnd);
	        }
	      });

	      document.body.classList.remove(self.settings.prefix + '-open');

	      self.cb.after.forEach(function (cb) {
	        return cb(self);
	      });
	    }
	  }, {
	    key: 'addBeforeCb',
	    value: function addBeforeCb(cb) {
	      if ((0, _utils.isFunction)(cb)) {
	        return this.cb.before.push(cb);
	      }
	    }
	  }, {
	    key: 'addAfterCb',
	    value: function addAfterCb(cb) {
	      if ((0, _utils.isFunction)(cb)) {
	        return this.cb.after.push(cb);
	      }
	    }
	  }, {
	    key: '_mountElementToContent',
	    value: function _mountElementToContent() {
	      var self = this;
	      if (self._getElementDisplay() === 'none') {
	        self.element.style.display = 'block';
	      }
	      self.content.appendChild(self.element);
	    }
	  }, {
	    key: '_mountElementBack',
	    value: function _mountElementBack() {
	      this.element.style.display = '';

	      this.elementParent.insertBefore(this.element, this.elementNextSibling);
	    }
	  }, {
	    key: '_getElementDisplay',
	    value: function _getElementDisplay() {
	      var self = this;
	      var computedStyles = window.getComputedStyle(self.element);
	      return computedStyles.getPropertyValue('display');
	    }
	  }, {
	    key: '_setShowStyles',
	    value: function _setShowStyles() {
	      this.backdrop.style.opacity = this.settings.bgOpacity;

	      if (_utils.transform3dSupport) {
	        this.container.style[(0, _utils.prefixed)('transform')] = 'translate3d(0, 0, 0)';
	      } else {
	        this.container.style[(0, _utils.prefixed)('transform')] = 'translateX(0)';
	      }
	    }
	  }, {
	    key: '_setHiddenStyles',
	    value: function _setHiddenStyles() {
	      var hideTransformX = this.settings.hideTransformX;
	      this.backdrop.style.opacity = '0';

	      if (_utils.transform3dSupport) {
	        this.container.style[(0, _utils.prefixed)('transform')] = 'translate3d(' + hideTransformX + ', 0, 0)';
	      } else {
	        this.container.style[(0, _utils.prefixed)('transform')] = 'translateX(' + hideTransformX + ')';
	      }
	    }
	  }, {
	    key: '_setWrapBaseStyles',
	    value: function _setWrapBaseStyles() {
	      var style = this.wrap.style;
	      var _settings$animation = this.settings.animation;
	      var duration = _settings$animation.duration;
	      var easing = _settings$animation.easing;


	      style.position = 'fixed';
	      style.left = '0';
	      style.top = '0';
	      style.width = '100%';
	      style.height = '100%';
	      style.overflow = 'hidden';
	      style.zIndex = this.settings.zIndex;
	      style[(0, _utils.prefixed)('transform')] = 'translate3d(0, 0, 0)';
	      style[(0, _utils.prefixed)('transition')] = duration + 'ms visibility ' + easing;
	    }
	  }, {
	    key: '_setBackdropBaseStyles',
	    value: function _setBackdropBaseStyles() {
	      var style = this.backdrop.style;
	      var _settings$animation2 = this.settings.animation;
	      var duration = _settings$animation2.duration;
	      var easing = _settings$animation2.easing;


	      style.position = 'fixed';
	      style.top = '0';
	      style.left = '0';
	      style.width = '100%';
	      style.height = '100%';
	      style.background = this.settings.bgColor;
	      style.opacity = '0';
	      style.zIndex = this.settings.zIndexBg;
	      style[(0, _utils.prefixed)('transform')] = 'translate3d(0, 0, 0)';
	      style[(0, _utils.prefixed)('transition')] = duration + 'ms opacity ' + easing;
	    }
	  }, {
	    key: '_setContainerBaseStyles',
	    value: function _setContainerBaseStyles() {
	      var style = this.container.style;
	      var _settings$animation3 = this.settings.animation;
	      var duration = _settings$animation3.duration;
	      var easing = _settings$animation3.easing;


	      if (typeof this.settings.width === 'string') {
	        style.width = this.settings.width;
	      } else if (typeof this.settings.width === 'number') {
	        style.width = this.settings.width + 'px';
	      }
	      if (this.settings.side === 'right') {
	        style.cssFloat = 'right';
	      }
	      style.zIndex = this.settings.zIndexContainer;
	      style.height = '100%';
	      style.overflowX = 'hidden';
	      style.overflowY = 'auto';
	      style.position = 'relative';
	      style[(0, _utils.prefixed)('boxSizing')] = 'border-box';
	      style[(0, _utils.prefixed)('transition')] = duration + 'ms transform ' + easing;
	      style[(0, _utils.prefixed)('willChange')] = 'transform';
	      if (_utils.transform3dSupport) {
	        style[(0, _utils.prefixed)('transform')] = 'translate3d(' + this.settings.hideTransformX + ', 0, 0)';
	      } else {
	        style[(0, _utils.prefixed)('transform')] = 'translateX(' + this.settings.hideTransformX + ')';
	      }
	    }
	  }, {
	    key: '_setBaseStyles',
	    value: function _setBaseStyles() {
	      this._setWrapBaseStyles();
	      this._setBackdropBaseStyles();
	      this._setContainerBaseStyles();
	    }
	  }]);

	  return slideMenu;
	}();

	exports.default = slideMenu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  prefix: 'rs-sm',
	  side: 'left',
	  zIndex: 1500,
	  bgColor: '#000',
	  bgOpacity: '0.6',
	  animation: {
	    duration: '300',
	    easing: 'ease'
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function createElementWithClass(className) {
	  var tag = arguments.length <= 1 || arguments[1] === undefined ? 'div' : arguments[1];

	  var el = document.createElement(tag);
	  el.className = className;
	  return el;
	}

	function createCloseBtn(prefix) {
	  var closeBtn = createElementWithClass(prefix + '-close', 'button');
	  closeBtn.innerHTML = '&times;';
	  return closeBtn;
	}

	function createContainerBar(prefix) {
	  var containerBar = createElementWithClass(prefix + '-container__bar');
	  containerBar.appendChild(createCloseBtn(prefix));

	  return containerBar;
	}

	function createContainer(prefix) {
	  var container = createElementWithClass(prefix + '-container');

	  var containerBar = createContainerBar(prefix);

	  container.appendChild(containerBar);

	  return container;
	}

	exports.default = function (prefix) {
	  var wrap = createElementWithClass(prefix + '-wrap');
	  var backdrop = createElementWithClass(prefix + '-backdrop');
	  var container = createContainer(prefix);
	  var content = createElementWithClass(prefix + '-content');

	  container.appendChild(content);

	  wrap.appendChild(backdrop);
	  wrap.appendChild(container);

	  return {
	    wrap: wrap,
	    backdrop: backdrop,
	    container: container,
	    content: content
	  };
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isFunction = isFunction;
	exports.isNode = isNode;
	exports.isElement = isElement;
	exports.prefixed = prefixed;
	function isFunction(fn) {
	  return typeof fn === 'function';
	}

	function isNode(o) {
	  return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? o instanceof Node : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
	}

	function isElement(o) {
	  return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? o instanceof HTMLElement : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string';
	}

	function whichTransitionEventName() {
	  var t = void 0;
	  var el = document.createElement('fakeelement');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  /* eslint-disable no-restricted-syntax */
	  for (t in transitions) {
	    if (el.style[t] !== undefined) {
	      return transitions[t];
	    }
	  }

	  return transitions.transition;
	}

	var transitionend = exports.transitionend = whichTransitionEventName();

	function prefixed(prop) {
	  var div = document.createElement('div');
	  // Handle unprefixed versions (FF16+, for example)
	  if (prop in div.style) return prop;

	  var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	  var propCapitalized = prop.charAt(0).toUpperCase() + prop.substr(1);

	  for (var i = 0; i < prefixes.length; ++i) {
	    var vendorProp = prefixes[i] + propCapitalized;
	    if (vendorProp in div.style) {
	      return vendorProp;
	    }
	  }

	  return prop;
	}

	function checkTransform3dSupport() {
	  var div = document.createElement('div');
	  var transform = prefixed('transform');
	  div.style[transform] = '';
	  div.style[transform] = 'rotateY(90deg)';
	  return div.style[transform] !== '';
	}

	var transform3dSupport = exports.transform3dSupport = checkTransform3dSupport();

/***/ }
/******/ ])
});
;