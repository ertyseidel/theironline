;(function(exports){

	exports.Game = function(settings) {
		this.coq = new Coquette(this, settings.canvas, settings.canvas.width, settings.canvas.height, settings.color_background_fill);
	}

	exports.Game.prototype = {
		state: {
			debug: false,
			gameState: 'start_state'
		},
		setState: function(newState) {
			if(this.state.debug) {
				console.log(this.state.gameState + " -> " + newState)
			}
			this.state = newState;
		}
	};

})(window);
