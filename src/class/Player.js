;(function(exports) {
	const MOVE_TIME = 10;
	const ATTACK_TIME = 4;
	const WAIT_TIME = 1;
	const REGEN_MOD = 80;

	exports.Player = function (game, settings) {
		this.game = game;
		if (settings.gpos) {
			this.gpos = settings.gpos;
			this.pos = Util.gridToPixels(this.gpos);
		} else {
			this.gpos = {i : 0, j : 0};
			this.pos = {x : 0, y : 0};
		}

		this.size = {x : GRID_X, y : GRID_Y};
		this.velocity = settings.velocity || {x : 0, y : 0};

		this.health = 20;
		this.smell = this.game.coq.entities.create(Smell, {});

		this.name = "You";

		this.senseStrengths = {};
		this.senseStrengths[SENSE_SIGHT] = 100;
		this.senseStrengths[SENSE_SMELL] = 5;
		this.senseStrengths[SENSE_SOUND] = 1000;
		this.senseStrengths[SENSE_TOUCH] = 1;
		this.senseStrengths[SENSE_TASTE] = 1;
	};

	exports.Player.prototype = {
		beforeTurn : function () {

		},
		afterTurn : function () {
			this.smell.increase(this.gpos, 0.5);
		},
		attemptMove : function (delta) {
			var moveResult = this.game.attemptMove(this, delta);
			if (moveResult === true) {
				return this.move(delta);
			} else if (moveResult) {
				return this.attack(moveResult);
			}
		},
		move : function(delta) {
			this.gpos.i += delta.i;
			this.gpos.j += delta.j;
			return MOVE_TIME;
		},
		wait : function() {
			return WAIT_TIME;
		},
		die : function() {
			this.game.coq.entities.destroy(this);
		},
		attack : function(other) {
			if (other.takeDamage) {
				console.log(this.name + " hit " + other.name);
				other.takeDamage(1);
				return ATTACK_TIME;
			}
			return 0;
		},
		takeDamage : function(dmg) {
			this.health -= dmg;
		},
		getSenseStrength : function(sense, gpos) {
			var dist = Util.gridDistance(this.gpos, gpos);
			if (!this.senseStrengths[sense] || dist > this.senseStrengths[sense]) {
				return 0;
			}
			return ((this.senseStrengths[sense] - dist) / this.senseStrengths[sense]);
		},
		isCollision : function(otherGpos) {
			return this.gpos.i == otherGpos.i && this.gpos.j == otherGpos.j;
		},
		update : function() {
			//movement
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.UP_ARROW)) {
				this.game.requestPlayerAction(function() {
					return this.attemptMove({i : 0, j : -1});
				});
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.RIGHT_ARROW)) {
				this.game.requestPlayerAction(function() {
					return this.attemptMove({i : 1, j : 0});
				});
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.DOWN_ARROW)) {
				this.game.requestPlayerAction(function() {
					return this.attemptMove({i : 0, j : 1});
				});
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.LEFT_ARROW)) {
				this.game.requestPlayerAction(function() {
					return this.attemptMove({i : -1, j : 0});
				});
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.PERIOD)) {
				this.game.requestPlayerAction(function() {
					return this.wait({i : 0, j : 0});
				});
			}
			//senses
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.ONE)) {
				this.game.activeSense = SENSE_SIGHT;
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.TWO)) {
				this.game.activeSense = SENSE_TOUCH;
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.THREE)) {
				this.game.activeSense = SENSE_SMELL;
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.FOUR)) {
				this.game.activeSense = SENSE_TASTE;
			}
			if(this.game.coq.inputter.isPressed(this.game.coq.inputter.FIVE)) {
				this.game.activeSense = SENSE_SOUND;
			}

			this.pos = Util.gridToPixels(this.gpos);
		},
		draw : function(ctx) {
			switch(this.game.activeSense) {
				case SENSE_SIGHT:
				case SENSE_SMELL:
					ctx.fillStyle = "blue";
					ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
					break;
				case SENSE_SOUND:
					ctx.fillStyle = "green";
					ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
					break;
			}
			ctx.fillStyle = "white";
			ctx.font = "20px monospace";
			var info = "";
			info += "HP: ";
			ctx.fillText(info + this.health, 0, CANVAS_HEIGHT);
		}
	};

})(window);
