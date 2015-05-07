;(function(exports) {
	var i;

	var getMatrixTransform = function(matrix) {
		return function() {
			this.velocity = {
				x : ((this.velocity.x * matrix[0]) + (this.velocity.y * matrix[1])) + 0.5 | 0,
				y : ((this.velocity.x * matrix[2]) + (this.velocity.y * matrix[3])) + 0.5 | 0
			};
		};
	};

	var Line = function(options) {

		this.pos = options.pos || {x : 0, y : 0};
		this.velocity = options.velocity || {x : Math.random() > 0.5 ? 1 : -1, y : Math.random() > 0.5 ? 1 : -1};
		this.actions = [
			{
				name : "left",
				odds : 0.02,
				action : getMatrixTransform([0, -1, 1, 0])
			},
			{
				name : "soft left",
				odds : 0.05,
				action : getMatrixTransform([1, 1, -1, 1])
			},
			{
				name : "right",
				odds : 0.02,
				action : getMatrixTransform([0, 1, -1, 0])
			},
			{
				name : "soft right",
				odds : 0.05,
				action : getMatrixTransform([1, -1, 1, 1])
			},
			{
				name : "branch",
				odds : 0.01,
				action : function() {}
			},
			{
				name : "straight",
				odds : 1,
				action : function() {}
			}
		];

		if (options.actions) {
			for (var i in options.actions) {
				this.actions[i] = options.actions[i];
			}
		}

		this.locations = [];
	};

	Line.prototype.update = function() {
		var choice = Math.random(),
			currentSum = this.actions[0].odds,
			index = 0;

		while (choice > currentSum) {
			index += 1;
			currentSum += this.actions[index].odds;
		}

		this.actions[index].action.apply(this);

		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;

		this.locations.push({
			x : this.pos.x,
			y : this.pos.y
		});
	};

	exports.LineGenerator = function(map, options) {
		var line = new Line({});
		for (i = 0; i < 100; i ++) {
			line.update();
		}
		console.log(line.locations);
	};

})(window);

LineGenerator();

