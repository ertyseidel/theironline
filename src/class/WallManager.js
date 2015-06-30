;(function(exports) {

	exports.WallManager = function(game, options) {
		this.game = game;
		this.walls = options.walls || {};
	};

	exports.WallManager.prototype = {
		wallAt : function(gpos) {
			return this.walls[gpos.i + "," + gpos.j];
		},

		addWall : function(gpos, walltype) {
			this.walls[gpos.i + "," + gpos.j] = {
				gpos : gpos,
				walltype : walltype
			};
		},

		removeWall : function(gpos) {
			delete this.walls[gpos.i + "," + gpos.j];
		},

		isCollision : function(gpos) {
			return gpos.i + "," + gpos.j in this.walls;
		},

		draw : function(ctx) {
			if (this.game.activeSense !== SENSE_SIGHT) {
				return;
			}
			for (var gpos in this.walls) {
				if (this.walls.hasOwnProperty(gpos)) {
					ctx.fillStyle = WALL_COLORS[this.walls[gpos].walltype];
					ctx.fillRect(
						this.walls[gpos].gpos.i * GRID_X,
						this.walls[gpos].gpos.j * GRID_Y,
						GRID_X,
						GRID_Y
					);
				}
			}
		}
	};

})(window);
