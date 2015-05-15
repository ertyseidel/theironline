;(function(exports){
	exports.Game = function(settings) {
		this.coq = new Coquette(this, settings.canvas, CANVAS_WIDTH, CANVAS_HEIGHT, "black");
		this.gameState = '';
		this.player = null;
		this.setState('debug');
		this.playerActionQueue = [];
		this.playerActionTimeout = 0;
		this.turboMode = true;
		this.activeSense = SENSE_SIGHT;
		this.smells = [];
		this.turns = 0;
	};

	exports.Game.prototype = {
		/*
		 * Return true if move,
		 * false if can't move,
		 * enemy if occupied
		 */
		attemptMove : function(object, delta) {
			var all = this.coq.entities.all(),
				i = 0,
				other;
			if (object.gpos.i + delta.i < 0) {
				return false;
			}
			if (object.gpos.i + delta.i >= (CANVAS_WIDTH / GRID_X)) {
				return false;
			}
			if (object.gpos.j + delta.j < 0) {
				return false;
			}
			if (object.gpos.j + delta.j >= (CANVAS_HEIGHT / GRID_Y)) {
				return false;
			}
			for (i = 0; i < all.length; i++) {
				if (!all[i].gpos) {
					continue;
				}
				if (all[i].gpos.i === object.gpos.i + delta.i &&
					all[i].gpos.j === object.gpos.j + delta.j
				) {
					return all[i];
				}
			}
			return true;
		},

		setState: function(newState) {
			this.gameState = newState;
			Script[this.gameState].setup.call(this);
		},
		requestPlayerAction : function(action) {
			if (this.playerActionQueue.length > MAX_PLAYER_ACTION_QUEUE_LENGTH) {
				return;
			}
			this.playerActionQueue.push(action);
		},
		update : function() {
			var action,
				time;
			if (this.playerActionTimeout) {
				this.playerActionTimeout -= 1;
				this.turns += 1;
			} else if(this.playerActionQueue.length) {
				action = this.playerActionQueue.shift();
				this.player.beforeTurn();
				time = action.call(this.player);
				this.player.afterTurn();
				if (time) {
					this.playerActionTimeout += time;
				}
			}
		},
		draw : function(ctx) {
			if (this.playerActionTimeout) {
				ctx.fillStyle = "red";
				ctx.fillRect(0, CANVAS_HEIGHT - ACTIVITY_BAR_HEIGHT, CANVAS_WIDTH * this.playerActionTimeout / MAX_ACTIVITY, ACTIVITY_BAR_HEIGHT);
			}
		}
	};

})(window);
