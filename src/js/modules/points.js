/* global Controller, Board, Subpoints */

'use strict';
var Points = (function () {
	var points = [];
	var selectedPoint;

	var draw = function (graphics) {
		for (var i = 0; i < points.length; i++) {
			graphics.fillStyle = "red";
			graphics.beginPath();
			graphics.arc(Board.convertX(points[i].x), Board.convertY(points[i].y), 20, 0, 2 * Math.PI);
			graphics.closePath();
			graphics.fill();
		}
	};

	var update = function () {
		var dir;
		if (Controller.isMouseDown()) {
			if (selectedPoint === undefined) {
				for (var i = 0; i < points.length; i++) {
					dir = Controller.getControllerDirection({
						x: Board.convertX(points[i].x),
						y: Board.convertY(points[i].y)
					});
					var length = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
					if (length > 20) {
						continue;
					}
					selectedPoint = points[i];
				}
			} else {
				dir = Controller.getControllerDirection({
					x: Board.convertX(selectedPoint.x),
					y: Board.convertY(selectedPoint.y)
				});
				selectedPoint.x += Board.unconvertX(dir.x) / 1.01;
				selectedPoint.y += Board.unconvertY(dir.y) / 1.01;
				Subpoints.reset();
			}
		} else {
			if (selectedPoint !== undefined) {
				selectedPoint = undefined;
			}
		}
	};

	var addPoint = function () {
		points.push({x: 0.5, y: 0.5});
	};
	
	var getPoints = function() {
		return points;
	};

	points.push({x: 0.1, y: 0.1});

	points.push({x: 0.1, y: 0.9});

	points.push({x: 0.9, y: 0.1});

	points.push({x: 0.9, y: 0.9});

	var self = {
		addPoint: addPoint,
		update: update,
		draw: draw,
		getPoints: getPoints
	};
	return self;
})();
