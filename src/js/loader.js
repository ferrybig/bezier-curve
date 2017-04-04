/* global Gameloop, Board */

'use strict';
(function () {
	var oldLoad = window.onload;
	window.onload = function () {
		if (oldLoad)
			oldLoad();

		console.log("Initizing...");
		Gameloop.init(document.getElementById('snake'));
	};
}());
