;(function(exports) {

	var canvas = document.getElementById('canvas');
	var settings = {
		canvas: canvas,
		color_background_fill: 'black'
	};

	var game = new Game(settings);
	game.setState("state_start");
});
