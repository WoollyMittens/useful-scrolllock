/*
	Source:
	van Creij, Maurice (2012). "useful.scrolllock.js: Manages elements that float overtop of scrolling content.", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// public object
var useful = useful || {};

(function(){

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
			// disable the start function so it can't be started twice
			this.start = function () {};
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
		// go
		this.start();
	};

	// return as a require.js module
	if (typeof module !== 'undefined') {
		exports = module.exports = useful.Aspectratio;
	}

})();
