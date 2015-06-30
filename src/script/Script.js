;(function(exports) {
	exports.Script = {
		debug : {
			setup : function() {
				var i, j, walls;
				this.player = this.coq.entities.create(Player, {gpos: {i: 1, j: 1}});
				this.coq.entities.create(DebugMonster, {gpos : {i : 10, j : 10}});
				this.coq.entities.create(DebugMonster, {gpos : {i : 20, j : 10}});
				this.coq.entities.create(DebugMonster, {gpos : {i : 10, j : 20}});
				walls = this.coq.entities.create(WallManager, {});
				for (j = 0; j < CANVAS_WIDTH / GRID_X; j++) {
					walls.addWall({i : 0, j : j}, WALL_NORMAL);
					walls.addWall({i : CANVAS_HEIGHT / GRID_Y, j : j}, WALL_NORMAL);
				}
				for (i = 0; i < CANVAS_HEIGHT / GRID_Y; i++) {
					walls.addWall({i : i, j : 0}, WALL_NORMAL);
					walls.addWall({i : i, j : CANVAS_WIDTH / GRID_X}, WALL_NORMAL);
				}
			}
		}
	};
})(window);
