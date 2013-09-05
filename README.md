# useful.scrolllock.js: Navigation Scroll-lock

The navigation bar becomes fix to the top of the screen after scrolling down the page.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=useful-scrolllock">countdown demo</a>.

## How to use the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/scrolllock.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/scrolllock.min.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```

## How to start the script

```javascript
var scrollock = new useful.Scrolllock( document.getElementById('id'), {
	'threshold' : {x:0, y:96}
});
scrollock.start();
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**threshold : {object}** - After scrolling this far, the navigation becomes fixed. If not defined, the position will be measured instead.

## Prerequisites

To concatenate and minify the script yourself, the following prerequisites are required:
+ https://github.com/WoollyMittens/useful-positions
+ https://github.com/WoollyMittens/useful-polyfills

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
