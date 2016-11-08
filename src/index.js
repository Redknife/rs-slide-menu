import SlideMenu from './slideMenu';

export const Menu = SlideMenu;

export function init(el, settings) {
  return new SlideMenu(el, settings);
}

export default Menu;
