import SlideMenu from './slideMenu';

export default SlideMenu;

export function init(el, settings) {
  return new SlideMenu(el, settings);
}

