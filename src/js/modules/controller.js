'use strict';
var Controller = (function () {
	var mouseHold = false;
	var mouseDown = false;
	var hasSeenMouse = false;
	var mouseLocation = {x: 0, y: 0};
	var keys = {
	};
	var keysToDisable = {
	};
	var keyboardMode = true;


	var _getMouseFromEvent = function (event) {
		var mouseX, mouseY;
		if (event.offsetX) {
			mouseX = event.offsetX;
			mouseY = event.offsetY;
		} else if (event.layerX) {
			mouseX = event.layerX;
			mouseY = event.layerY;
		}
		return {x: mouseX, y: mouseY};
	};
	var getControllerDirection = function (canvasOffset, normalize) {
		var raw = {x: 0, y: 0};
		if (keyboardMode) {
			if (keys[37] || keys[65]) {
				raw.x -= 1;
			}
			if (keys[38] || keys[87]) {
				raw.y -= 1;
			}
			if (keys[39] || keys[68]) {
				raw.x += 1;
			}
			if (keys[40] || keys[83]) {
				raw.y += 1;
			}
		} else {
			raw.x = mouseLocation.x - canvasOffset.x;
			raw.y = mouseLocation.y - canvasOffset.y;
		}
		if(raw.x === Number.NaN || raw.y === Number.NaN) {
			return {x: 0, y: 0};
		}
		if(normalize) {
			var length = Math.sqrt(raw.x * raw.x + raw.y * raw.y);
			if(length > 1) {
				raw.x /= length;
				raw.y /= length;
			}
		}
		return raw;
	};
	var getArrowDirection = function (canvasOffset) {
		var controller = getControllerDirection(canvasOffset);
		if (!controller.x && !controller.y) {
			return [];
		} else if (Math.abs(controller.x) > Math.abs(controller.y)) {
			if (controller.x > 0) {
				return ["rigth", controller.y > 0 ? "down" : "up"];
			} else {
				return ["left", controller.y > 0 ? "down" : "up"];
			}
		} else {
			if (controller.y > 0) {
				return ["down", controller.x > 0 ? "rigth" : "left"];
			} else {
				return ["up", controller.x > 0 ? "rigth" : "left"];
			}
		}
	};
	var hasClicked = function () {
		return hasSeenMouse;
	};
	var update = function () {
		hasSeenMouse = mouseHold;
		mouseHold = false;
		for(var code in keysToDisable) {
			delete keys[code];
		}
		keysToDisable = [];
	};
	var draw = function () {

	};
	var isMouseDown = function() {
		return mouseDown;
	};
	var init = function (canvas) {

		var lastDownTarget = canvas;
		document.addEventListener('keydown', function (event) {
			if (lastDownTarget === canvas) {
				keys[event.keyCode] = true;
				delete keysToDisable[event.keyCode];
			}
			keyboardMode = true;
		}, false);
		document.addEventListener('keyup', function (event) {
			if (lastDownTarget === canvas) {
				keysToDisable[event.keyCode] = true;
			}
		}, false);
		document.addEventListener('mousedown', function (event) {
			lastDownTarget = event.target;
			mouseHold = true;
			mouseLocation = _getMouseFromEvent(event);
			keyboardMode = false;
			mouseDown = true;
		}, false);
		document.addEventListener('mousemove', function (event) {
			if (canvas === event.target) {
				mouseLocation = _getMouseFromEvent(event);
			}
		}, false);
		document.addEventListener('mouseup', function (event) {
			mouseDown = false;
			mouseLocation = _getMouseFromEvent(event);
		}, false);
	};

	var self = {
		update: update,
		draw: draw,
		getArrowDirection: getArrowDirection,
		getControllerDirection: getControllerDirection,
		hasClicked: hasClicked,
		init: init,
		isMouseDown: isMouseDown
	};
	return self;
})();
