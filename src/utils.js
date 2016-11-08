export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isNode(o) {
  return (
    typeof Node === 'object' ? o instanceof Node :
    o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
  );
}

export function isElement(o) {
  return (
    typeof HTMLElement === 'object' ? o instanceof HTMLElement :
    o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
  );
}

function whichTransitionEventName() {
  let t;
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  /* eslint-disable no-restricted-syntax */
  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }

  return transitions.transition;
}

export const transitionend = whichTransitionEventName();

export function prefixed(prop) {
  const div = document.createElement('div');
  // Handle unprefixed versions (FF16+, for example)
  if (prop in div.style) return prop;

  const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
  const propCapitalized = prop.charAt(0).toUpperCase() + prop.substr(1);

  for (let i = 0; i < prefixes.length; ++i) {
    const vendorProp = prefixes[i] + propCapitalized;
    if (vendorProp in div.style) { return vendorProp; }
  }

  return prop;
}

function checkTransform3dSupport() {
  const div = document.createElement('div');
  const transform = prefixed('transform');
  div.style[transform] = '';
  div.style[transform] = 'rotateY(90deg)';
  return div.style[transform] !== '';
}

export const transform3dSupport = checkTransform3dSupport();
