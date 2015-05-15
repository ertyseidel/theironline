;(function(exports) {
	exports.Util = {
		pixelsToGrid : function(pos) {
			return { i : Math.floor(pos.x / GRID_X), j : Math.floor(pos.y / GRID_Y)};
		},
		gridToPixels : function(gpos) {
			return { x : gpos.i * GRID_X, y : gpos.j * GRID_Y};
		},
		roll : function(dice) {
			var re = /(\d*)d(\d+)([+-]\d+)?/;
			var parts = dice.match(re);
			numDie = parseInt(parts[1], 10) || 1;
			numPips = parseInt(parts[2], 10);
			modifier = parseInt(parts[3]) || 0;
			var sum = 0;
			for (var i = 0; i < numDie; i++) {
				sum += (1 + Math.floor(Math.random() * numPips));
			}
			return sum + modifier;
		},
		gridDistance : function(gpos1, gpos2) {
			var i = gpos1.i - gpos2.i;
			var j = gpos1.j - gpos2.j;
			return Math.sqrt((i * i) + (j * j));
		}
	};
})(window);
