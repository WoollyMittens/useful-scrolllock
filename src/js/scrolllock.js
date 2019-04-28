/*
	Source:
	van Creij, Maurice (2018). "scrolllock.js: Manages elements that float overtop of scrolling content.", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var ScrollLock = function (config) {

	// PROPERTIES

	this.config = null;
	this.element = null;

	// METHODS

	this.init = function (config) {
		// store the config
		this.config = config;
		this.element = config.element;
		// set the event handlers
		window.addEventListener('scroll', this.onReposition.bind(this), false);
		window.addEventListener('resize', this.onReposition.bind(this), false);
		// measure the trigger position if none was given
		this.config.threshold = this.config.threshold || positions.object(this.element);
		// return the object
		return this;
	};

	// EVENTS

	this.onReposition = function () {
		// get the current scroll position
		var scrolled = positions.document();
		// if scrolled far enough
		if (scrolled.y > this.config.threshold.y || scrolled.x > this.config.threshold.x) {
			// apply the scroll lock class
			if (!this.element.className.match(/scroll-locked/gi)) {
				this.element.className = this.element.className.replace(/scroll-unlocked/g, '').replace(/  /g, ' ') + ' scroll-locked';
			}
		} else {
			// remove the scroll lock style
			if (!this.element.className.match(/scroll-unlocked/gi)) {
				this.element.className = this.element.className.replace(/scroll-locked/g, '').replace(/  /g, ' ') + ' scroll-unlocked';
			}
		}
	};

	this.init(config);
};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return ScrollLock });
if (typeof module != 'undefined') module.exports = ScrollLock;
