/* global Points, Board */

'use strict';

var Subpoints = (function () {
	var subpoints = [];
	var indicationPoints = [];
	var indicationPointsSubLength;
	var index = 0;
	
	
	var reduce = function(first, second, place) {
		return {
			x: first.x - (first.x - second.x) * place,
			y: first.y - (first.y - second.y) * place
		};
	};

	var draw = function (graphics) {
		for (var i = 0; i < subpoints.length; i++) {
			graphics.fillStyle = "black";
			graphics.beginPath();
			graphics.arc(Board.convertX(subpoints[i].x), Board.convertY(subpoints[i].y), 5, 0, 2 * Math.PI);
			graphics.closePath();
			graphics.fill();
		}
		for (i = 0; i < indicationPoints.length; i++) {
			graphics.fillStyle = "gray";
			graphics.beginPath();
			graphics.arc(Board.convertX(indicationPoints[i].x), Board.convertY(indicationPoints[i].y), 7, 0, 2 * Math.PI);
			graphics.closePath();
			graphics.fill();
		}
		var filler = 0;
		graphics.strokeStyle = "darkgray";
		graphics.lineWidth = 1;
		graphics.beginPath();
		for(i = indicationPointsSubLength; i > 1; i--) {
			graphics.moveTo(Board.convertX(indicationPoints[filler].x), Board.convertY(indicationPoints[filler].y));
			for(var j = 1; j < i; j++) {
				graphics.lineTo(Board.convertX(indicationPoints[filler + j].x), Board.convertY(indicationPoints[filler + j].y));
			}
			graphics.stroke();
			filler += j;
		}
		graphics.closePath();
	};

	var update = function () {
		for(var k = 0; k < 10; k++) {
			var points = Points.getPoints();
			indicationPointsSubLength = points.length;
			indicationPoints = points.concat([]);
			var readIndex = 0;
			var writeIndex = indicationPoints.length;
			for(var i = 1; i < points.length; i++) {
				var size = writeIndex - readIndex - 1;
				for(var j = 0; j < size; j++) {
					indicationPoints.push(reduce(indicationPoints[readIndex + j], indicationPoints[readIndex + j + 1], index / 1000));
				}
				readIndex = writeIndex;
				writeIndex = indicationPoints.length;
			}
			subpoints[index] = indicationPoints[readIndex];
			index++;
			if(index > 1000)
				index = 0;
		}
	};
	
	var reset = function() {
		subpoints = [];
		for(var i = 0; i < 1001; i++) {
			subpoints.push({
				x: undefined,
				y: undefined
			});
		}
		index = 0;
	};

	reset();

	var self = {
		update: update,
		draw: draw,
		reset: reset
	};
	return self;
})();
