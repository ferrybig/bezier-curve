'use strict';
var Board = (function () {
	var sizeX = 800;
	var sizeY = 800;

	var draw = function (graphics) {
	};

	var update = function () {
	};
	
	var convertX = function(x) {
		return x * sizeX;
	};
	var convertY = function(y) {
		return y * sizeY;
	};
	var unconvertX = function(x) {
		return x / sizeX;
	};
	var unconvertY = function(y) {
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
