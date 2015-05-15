;(function(exports) {

	exports.DebugMonster = function (game, settings) {
		this.game = game;

		if (settings.gpos) {
			this.gpos = settings.gpos;
			this.pos = Util.gridToPixels(this.gpos);
		} else {
			this.gpos = {i : 0, j : 0};
			this.pos = {x : 0, y : 0};
		}

		this.size = {x : GRID_X, y : GRID_Y};

		this.moveThreshold = 8;
		this.actionsSeen = Math.floor(Math.random() * this.moveThreshold);
		this.smell = this.game.coq.entities.create(Smell, {color : {r : 255, g: 0, b : 0}});

		this.name = "the DebugMonster";
		this.health = 2;
	};

	exports.DebugMonster.prototype = {
		attemptMove : function(delta) {
			var moveResult = this.game.attemptMove(this, delta);
			if (moveResult === true) {
				this.move(delta);
			} else if (moveResult && this.feelingsToward(moveResult) < 0) {
				this.attack(moveResult);
			}
		},
		feelingsToward : function (other) {
			if (other instanceof Player) {
				return -10;
			} else {
				return -1;
			}
		},
		move : function (delta) {
			this.gpos.i += delta.i;
			this.gpos.j += delta.j;
		},
		attack : function(other) {
			console.log(this.name + " hits " + other.name);
			other.takeDamage(1);
		},
		takeDamage : function(dmg) {
			this.health -= dmg;
		},
		die : function() {
			this.game.coq.entities.destroy(this);
		},
		update : function () {
			var playerDelta,
				delta = {i : 0, j : 0};

			if (!this.game.playerActionTimeout) {
				return;
			}

			if (!this.health) {
				this.die();
			}

			this.actionsSeen += 1;

			if (this.actionsSeen < this.moveThreshold) {
				return;
			}

			this.actionsSeen = 0;

			playerDelta = {
				i : this.gpos.i - this.game.player.gpos.i,
				j : this.gpos.j - this.game.player.gpos.j
			};

			//this.gpos.IloveErty.forever.and.ever.exc

			if (playerDelta.i) {
				delta.i = -playerDelta.i / Math.abs(playerDelta.i);
			}
			if (playerDelta.j) {
				delta.j = -playerDelta.j / Math.abs(playerDelta.j);
			}

			this.attemptMove(delta);

			this.smell.increase(this.gpos, 0.5);

			this.pos = Util.gridToPixels(this.gpos);
		},
		draw : function (ctx) {
			if (this.game.activeSense === SENSE_SIGHT) {
				ctx.fillStyle = "red";
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
		}
	};

})(window);
