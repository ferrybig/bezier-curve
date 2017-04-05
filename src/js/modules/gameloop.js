/* global Controller, Board, Points, Subpoints */

'use strict';
var Gameloop = (function() {
	
	var lastFrameTime;
	var thisFrameTime = 0;
	var targetPhysicsRate = 1000 / 30; // Run physics at 30 TPS
	var targetFrameRate = 1000 / 30; // Run frames at 30 FPS
	var paused = false;
	var canvas;
	var graphics;
	
	var _update = function() {
		if(!paused) {
			Points.update();
			Subpoints.update();
			Board.update();
			Controller.update();
		}
	};
	
	var _draw = function() {
		Board.draw(graphics);
		Points.draw(graphics);
		Subpoints.draw(graphics);
		Controller.draw(graphics);
	};
	
	var getCanvas = function() {
		return canvas;
	};
	
	var pause = function() {
		paused = true;
	};
	
	var setTargetPhysicsRate = function(target) {
		targetPhysicsRate = target;
	};
	
	var _loop = function() {
		var timeInMs = Date.now();
		if (lastFrameTime === undefined || timeInMs - lastFrameTime > 400) {
			// Either missed to many frames, or we are first starting
			// Adjust the frames by a few MS to prevent clock skew from messing with the time
			lastFrameTime = timeInMs - targetPhysicsRate / 10;
			_update();
		} else {
			while (timeInMs - lastFrameTime > targetPhysicsRate) {
				_update();
				lastFrameTime += targetPhysicsRate;
			}
		}
		_draw();
		_requestAnimFrame(_loop);
	};
	
	var init = function(canvasElm) {
		canvas = canvasElm;
		graphics = canvas.getContext('2d');
		Controller.init(canvasElm);
		_requestAnimFrame(_loop);
	};
	
	/**
	 * Using requestAnimationFrame instead of a simple `setTimeout` allows us to
	 *  get higher performance, by not blocking the browser when its trying to
	 *  render a frame
	 */
	var _requestAnimFrame = window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			function (callback) {
				window.setTimeout(callback, targetFrameRate);
			};
		
	var self = {
		init: init,
		setTargetPhysicsRate: setTargetPhysicsRate,
		pause: pause,
		getCanvas: getCanvas
	};
	return self;
})();
