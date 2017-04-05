/* global Gameloop */

'use strict';
var Board = (function () {
	var sizeX = 800;
	var sizeY = 800;
	var hasRegistered = false;

	var draw = function (graphics) {
		graphics.clearRect(0, 0, sizeX, sizeY);
	};

	var update = function () {
		if (!hasRegistered) {
			addEvent(window, "resize", resize);
			hasRegistered = true;
			resize();
		}
	};
	var resize = function () {
		Gameloop.getCanvas().width = sizeX = window.innerWidth;
		Gameloop.getCanvas().height = sizeY = window.innerHeight;
	};

	var addEvent = function (object, type, callback) {
		if (object === null || typeof (object) === 'undefined')
			return;
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on" + type] = callback;
		}
	};

	var convertX = function (x) {
		return x * sizeX;
	};
	var convertY = function (y) {
		return y * sizeY;
	};
	var unconvertX = function (x) {
		return x / sizeX;
	};
	var unconvertY = function (y) {
		return y / sizeY;
	};
	var self = {
		draw: draw,
		update: update,
		convertY: convertY,
		convertX: convertX,
		unconvertY: unconvertY,
		unconvertX: unconvertX
	};
	return self;
})();
