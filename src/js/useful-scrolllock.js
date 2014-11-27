/*
	Source:
	van Creij, Maurice (2014). "useful.scrolllock.js: Manages elements that float overtop of scrolling content.", version 20141127, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// create the constructor if needed
var useful = useful || {};
useful.ScrollLock = useful.ScrollLock || function () {};

// extend the constructor
useful.ScrollLock.prototype.init = function (cfg) {
	// properties
	"use strict";
	this.cfg = cfg;
	this.obj = cfg.element;
	// methods
	this.events = function () {
		var context = this;
		// set the event handlers
		window.addEventListener('scroll', this.onReposition(), false);
		window.addEventListener('resize', this.onReposition(), false);
		// measure the trigger position if none was given
		this.cfg.threshold = this.cfg.threshold || useful.positions.object(this.obj);
		// disable the start function so it can't be started twice
		this.init = function () {};
	};
	// events
	this.onReposition = function () {
		var _this = this;
		return function () {
			// get the current scroll position
			var scrolled = useful.positions.document();
			// if scrolled far enough
			if (scrolled.y > _this.cfg.threshold.y || scrolled.x > _this.cfg.threshold.x) {
				// apply the scroll lock class
				if (!_this.obj.className.match(/scroll-locked/gi)) {
					_this.obj.className = _this.obj.className.replace(/scroll-unlocked/g, '').replace(/  /g, ' ') + ' scroll-locked';
				}
			} else {
				// remove the scroll lock style
				if (!_this.obj.className.match(/scroll-unlocked/gi)) {
					_this.obj.className = _this.obj.className.replace(/scroll-locked/g, '').replace(/  /g, ' ') + ' scroll-unlocked';
				}
			}
		};
	};
	// go
	this.events();
	return this;
};

// return as a require.js module
if (typeof module !== 'undefined') {
	exports = module.exports = useful.ScrollLock;
}
