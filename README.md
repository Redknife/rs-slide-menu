# RS Slide Menu
Simple slide menu, without deps


## Example
[See example dir](example/)


## Installation

```
npm install rs-slide-menu
```


## Usage

#### Markup
```html
<div id="nav">
    <div class="m-menu_item">
        <a href="#">Shop</a>
    </div>

    <div class="m-menu_item">
        <a href="#">About</a>
    </div>

    <div class="m-menu_item">
        <a href="#">Contacts</a>
    </div>
</div>

<script src="rs-slide-menu.min.js"></script>
<script>
  var menu = SlideMenu.init('#nav', {
      toggler: '.js-open-nav'
  });
</script>
```

#### Styles
```css
#nav {
    display: none;
}
```


## Options

### Default options
```json
{
  "prefix": "rs-sm",
  "side": "left",
  "zIndex": "1500",
  "bgColor": "#000",
  "bgOpacity": "0.6",
  "animation": {
    "duration": "300",
    "easing": "ease"
  }
}
```

Option | Type | Description
------ | ---- | -----------
toggler | string | css selector of togglers
prefix | string | prefix to all class names
side | string ('left', 'right') | which side show menu
zIndex | number | z-index of menu
bgColor | string | color of backdrop
bgOpacity | string | opacity of backdrop
animation | object | animation params
duration | string/number | transition duration in ms
easing | string | transition timing function

## Lint and build (for developers)

```
npm run lint
npm run build
```


## License

Released under the MIT License. See the bundled `LICENSE` file for
details.
