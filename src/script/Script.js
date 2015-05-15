;(function(exports) {
	exports.Script = {
		debug : {
			setup : function() {
				this.player = this.coq.entities.create(Player, {});
				this.coq.entities.create(DebugMonster, {gpos : {i : 10, j : 10}});
				this.coq.entities.create(DebugMonster, {gpos : {i : 20, j : 10}});
				this.coq.entities.create(DebugMonster, {gpos : {i : 10, j : 20}});
			}
		}
	};
})(window);
