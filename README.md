# scrolllock.js: Navigation Scroll-lock

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

The navigation bar becomes fix to the top of the screen after scrolling down the page.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/scrolllock.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/positions.js"></script>
<script src="js/scrolllock.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/positions.js',
	'js/scrolllock.js'
], function(positions, Scrolllock) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {positions = require('lib/positions.js";
@import {Scrolllock} from "js/scrolllock.js";
```

## How to start the script

```javascript
var scrollock = new Scrolllock({
	'element' : document.getElementById('id'),
	'threshold' : {x:0, y:96}
});
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**threshold : {object}** - After scrolling this far, the navigation becomes fixed. If not defined, the position will be measured instead.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
