;(function(exports) {

	exports.LightSource = function(game, settings) {
		this.game = game;
		if (settings.gpos) {
			this.gpos = settings.gpos;
			this.pos = Util.gridToPixels(this.gpos);
		} else {
			this.gpos = {i : 0, j : 0};
			this.pos = {x : 0, y : 0};
		}

		this.size = {x : GRID_X, y : GRID_Y};

		this.radius = settings.radius || 20;
	};

	exports.LightSource.prototype = {
		draw : function(ctx) {
			if (this.game.activeSense === SENSE_SIGHT) {
				ctx.fillStyle = "yellow";
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
		},
		update : function (ctx) {
			this.pos = Util.gridToPixels(this.gpos);
		},
		getStrengthFor : function(gpos) {
			return  (this.radius - Util.gridDistance(this.gpos, gpos)) / this.radius;
		}
	};

})(window);
