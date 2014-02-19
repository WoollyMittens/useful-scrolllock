/*
	Source:
	van Creij, Maurice (2012). "useful.polyfills.js: A library of useful polyfills to ease working with HTML5 in legacy environments.", version 20121126, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// Invoke strict mode
	"use strict";

	// private functions
	var polyfills = polyfills || {};

	// enabled the use of HTML5 elements in Internet Explorer
	polyfills.html5 = function () {
		var a, b, elementsList;
		elementsList = ['section', 'nav', 'article', 'aside', 'hgroup', 'header', 'footer', 'dialog', 'mark', 'dfn', 'time', 'progress', 'meter', 'ruby', 'rt', 'rp', 'ins', 'del', 'figure', 'figcaption', 'video', 'audio', 'source', 'canvas', 'datalist', 'keygen', 'output', 'details', 'datagrid', 'command', 'bb', 'menu', 'legend'];
		if (navigator.userAgent.match(/msie/gi)) {
			for (a = 0 , b = elementsList.length; a < b; a += 1) {
				document.createElement(elementsList[a]);
			}
		}
	};

	// allow array.indexOf in older browsers
	polyfills.arrayIndexOf = function () {
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, start) {
				for (var i = (start || 0), j = this.length; i < j; i += 1) {
					if (this[i] === obj) { return i; }
				}
				return -1;
			};
		}
	};

	// allow document.querySelectorAll (https://gist.github.com/connrs/2724353)
	polyfills.querySelectorAll = function () {
		if (!document.querySelectorAll) {
			document.querySelectorAll = function (a) {
				var b = document, c = b.documentElement.firstChild, d = b.createElement("STYLE");
				return c.appendChild(d), b.__qsaels = [], d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}", window.scrollBy(0, 0), b.__qsaels;
			};
		}
	};

	// allow addEventListener (https://gist.github.com/jonathantneal/3748027)
	polyfills.addEventListener = function () {
		!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
			WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
				var target = this;
				registry.unshift([target, type, listener, function (event) {
					event.currentTarget = target;
					event.preventDefault = function () { event.returnValue = false; };
					event.stopPropagation = function () { event.cancelBubble = true; };
					event.target = event.srcElement || target;
					listener.call(target, event);
				}]);
				this.attachEvent("on" + type, registry[0][3]);
			};
			WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
				for (var index = 0, register; register = registry[index]; ++index) {
					if (register[0] == this && register[1] == type && register[2] == listener) {
						return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
					}
				}
			};
			WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
				return this.fireEvent("on" + eventObject.type, eventObject);
			};
		})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
	};

	// allow console.log
	polyfills.consoleLog = function () {
		if (!window.console) {
			window.console = {};
			window.console.log = function () {
				// if the reporting panel doesn't exist
				var a, b, messages = '', reportPanel = document.getElementById('reportPanel');
				if (!reportPanel) {
					// create the panel
					reportPanel = document.createElement('DIV');
					reportPanel.id = 'reportPanel';
					reportPanel.style.background = '#fff none';
					reportPanel.style.border = 'solid 1px #000';
					reportPanel.style.color = '#000';
					reportPanel.style.fontSize = '12px';
					reportPanel.style.padding = '10px';
					reportPanel.style.position = (navigator.userAgent.indexOf('MSIE 6') > -1) ? 'absolute' : 'fixed';
					reportPanel.style.right = '10px';
					reportPanel.style.bottom = '10px';
					reportPanel.style.width = '180px';
					reportPanel.style.height = '320px';
					reportPanel.style.overflow = 'auto';
					reportPanel.style.zIndex = '100000';
					reportPanel.innerHTML = '&nbsp;';
					// store a copy of this node in the move buffer
					document.body.appendChild(reportPanel);
				}
				// truncate the queue
				var reportString = (reportPanel.innerHTML.length < 1000) ? reportPanel.innerHTML : reportPanel.innerHTML.substring(0, 800);
				// process the arguments
				for (a = 0, b = arguments.length; a < b; a += 1) {
					messages += arguments[a] + '<br/>';
				}
				// output the queue to the panel
				reportPanel.innerHTML = messages + reportString;
			};
		}
	};

	// allows Object.create (https://gist.github.com/rxgx/1597825)
	polyfills.objectCreate = function () {
		if (typeof Object.create !== "function") {
			Object.create = function (original) {
				function Clone() {}
				Clone.prototype = original;
				return new Clone();
			};
		}
	};

	// allows String.trim (https://gist.github.com/eliperelman/1035982)
	polyfills.stringTrim = function () {
		if (!String.prototype.trim) {
			String.prototype.trim = function () { return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ''); };
		}
		if (!String.prototype.ltrim) {
			String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
		}
		if (!String.prototype.rtrim) {
			String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
		}
		if (!String.prototype.fulltrim) {
			String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
		}
	};

	// for immediate use
	polyfills.html5();
	polyfills.arrayIndexOf();
	polyfills.querySelectorAll();
	polyfills.addEventListener();
	polyfills.consoleLog();
	polyfills.objectCreate();
	polyfills.stringTrim();

}(window.useful = window.useful || {}));

/*
	Source:
	van Creij, Maurice (2012). "useful.positions.js: A library of useful functions to ease working with screen positions.", version 20121126, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

(function (useful) {

	// Invoke strict mode
	"use strict";

	// private functions
	var positions = positions || {};

	// find the dimensions of the window
	positions.window = function (parent) {
		// define a position object
		var dimensions = {x : 0, y : 0};
		// if an alternative was given to use as a window
		if (parent && parent !== window) {
			// find the current dimensions of surrogate window
			dimensions.x = parent.offsetWidth;
			dimensions.y = parent.offsetHeight;
		} else {
			// find the current dimensions of the window
			dimensions.x = window.innerWidth || document.body.clientWidth;
			dimensions.y = window.innerHeight || document.body.clientHeight;
		}
		// return the object
		return dimensions;
	};

	// find the scroll position of an element
	positions.document = function (parent) {
		// define a position object
		var position = {x : 0, y : 0};
		// find the current position in the document
		if (parent && parent !== window) {
			position.x = parent.scrollLeft;
			position.y = parent.scrollTop;
		} else {
			position.x = (window.pageXOffset) ?
				window.pageXOffset :
				(document.documentElement) ?
					document.documentElement.scrollLeft :
					document.body.scrollLeft;
			position.y = (window.pageYOffset) ?
				window.pageYOffset :
				(document.documentElement) ?
					document.documentElement.scrollTop :
					document.body.scrollTop;
		}
		// return the object
		return position;
	};

	// finds the position of the element, relative to the document
	positions.object = function (node) {
		// define a position object
		var position = {x : 0, y : 0};
		// if offsetparent exists
		if (node.offsetParent) {
			// add every parent's offset
			while (node.offsetParent) {
				position.x += node.offsetLeft;
				position.y += node.offsetTop;
				node = node.offsetParent;
			}
		}
		// return the object
		return position;
	};

	// find the position of the mouse cursor relative to an element
	positions.cursor = function (event, parent) {
		// get the event properties
		event = event || window.event;
		// define a position object
		var position = {x : 0, y : 0};
		// find the current position on the document
		position.x = event.pageX || event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		position.y = event.pageY || event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		// if a parent was given
		if (parent) {
			// retrieve the position of the parent
			var offsets = positions.object(parent);
			// adjust the coordinates to fit the parent
			position.x -= offsets.x;
			position.y -= offsets.y;
		}
		// return the object
		return position;
	};

	// public functions
	useful.positions = useful.positions || {};
	useful.positions.window = positions.window;
	useful.positions.document = positions.document;
	useful.positions.object = positions.object;
	useful.positions.cursor = positions.cursor;

}(window.useful = window.useful || {}));

/*
	Source:
	van Creij, Maurice (2012). "useful.scrolllock.js: Manages elements that float overtop of scrolling content.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<!--[if IE]>
		<script src="./js/html5.js"></script>
	<![endif]-->
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	useful.Scrolllock = function (obj, cfg) {
		// properties
		this.obj = obj;
		this.cfg = cfg;
		// methods
		this.start = function () {
			var context = this;
			// set the event handlers
			window.addEventListener('scroll', function () { context.adjust(); }, false);
			window.addEventListener('resize', function () { context.adjust(); }, false);
			// measure the trigger position if none was given
			this.cfg.threshold = this.cfg.threshold || useful.positions.object(this.obj);
		};
		this.adjust = function () {
			// get the current scroll position
			var scrolled = useful.positions.document();
			// if scrolled far enough
			if (scrolled.y > this.cfg.threshold.y || scrolled.x > this.cfg.threshold.x) {
				// apply the scroll lock class
				if (!this.obj.className.match(/scroll-locked/gi)) {
					this.obj.className = this.obj.className.replace(/scroll-unlocked/g, '').replace(/  /g, ' ') + ' scroll-locked';
				}
			} else {
				// remove the scroll lock style
				if (!this.obj.className.match(/scroll-unlocked/gi)) {
					this.obj.className = this.obj.className.replace(/scroll-locked/g, '').replace(/  /g, ' ') + ' scroll-unlocked';
				}
			}
		};
	};

}(window.useful = window.useful || {}));
