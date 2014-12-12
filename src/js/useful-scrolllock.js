/*
	Source:
	van Creij, Maurice (2014). "useful.scrolllock.js: Manages elements that float overtop of scrolling content.", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the global object if needed
var useful = useful || {};

// extend the global object
useful.ScrollLock = function (config) {

	// PROPERTIES

	"use strict";

	// METHODS

	this.init = function (config) {
		// store the config
		this.config = config;
		this.element = config.element;
		// set the event handlers
		window.addEventListener('scroll', this.onReposition(), false);
		window.addEventListener('resize', this.onReposition(), false);
		// measure the trigger position if none was given
		this.config.threshold = this.config.threshold || useful.positions.object(this.element);
		// return the object
		return this;
	};

	// EVENTS

	this.onReposition = function () {
		var _this = this;
		return function () {
			// get the current scroll position
			var scrolled = useful.positions.document();
			// if scrolled far enough
			if (scrolled.y > _this.config.threshold.y || scrolled.x > _this.config.threshold.x) {
				// apply the scroll lock class
				if (!_this.element.className.match(/scroll-locked/gi)) {
					_this.element.className = _this.element.className.replace(/scroll-unlocked/g, '').replace(/  /g, ' ') + ' scroll-locked';
				}
			} else {
				// remove the scroll lock style
				if (!_this.element.className.match(/scroll-unlocked/gi)) {
					_this.element.className = _this.element.className.replace(/scroll-locked/g, '').replace(/  /g, ' ') + ' scroll-unlocked';
				}
			}
		};
	};

};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.ScrollLock;
}
