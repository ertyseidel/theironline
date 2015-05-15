;(function(exports) {

	exports.Smell = function (game, options) {
		this.game = game;
		this.color = options.color || {r : 0, g : 255, b : 0};

		this.smellets = options.smellets || [];
	};

	exports.Smell.prototype = {
		getSmelletAt : function(gpos) {
			var i;
			for (i = 0; i < this.smellets.length; i++) {
				if (Math.floor(this.smellets[i].i) == gpos.i &&
					Math.floor(this.smellets[i].j) == gpos.j
				) {
					return this.smellets[i];
				}
			}
			return null;
		},
		increase : function(gpos, amount) {
			var smellet = this.getSmelletAt(gpos);
			if (smellet) {
				smellet.power += amount;
				smellet.power = Math.min(MAX_SMELL, smellet.power);
				return;
			}
			this.smellets.push({
				i : gpos.i,
				j : gpos.j,
				power : amount
			});
		},
		wind : function(delta) {
			this.smellets.forEach(function(smellet) {
				smellet.i += delta.i;
				smellet.j += delta.j;
			});
		},
		update : function() {
			var self = this;
			if (!this.game.playerActionTimeout) {
				return;
			}
			this.smellets = this.smellets.filter(function(smellet) {
				smellet.power -= DEFAULT_SMELL_DISPERSAL;
				return smellet.power > 0;
			});
		},
		draw : function(ctx) {
			var color;
			if (game.activeSense != SENSE_SMELL) {
				return;
			}
			color = "rgba(" +
				this.color.r + "," +
				this.color.g + "," +
				this.color.b + ",";
			this.smellets.forEach(function(smellet) {
				var smelletPos = {i : Math.floor(smellet.i), j : Math.floor(smellet.j)};
				var playerSenseStrength = this.game.player.getSenseStrength(SENSE_SMELL, smelletPos);
				if (playerSenseStrength) {
					ctx.fillStyle = color + playerSenseStrength * smellet.power + ")";
					ctx.fillRect(smelletPos.i * GRID_X, smelletPos.j * GRID_Y, GRID_X, GRID_Y);
				}
			});
		}
	};

})(window);
