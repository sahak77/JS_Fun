var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Creatgrass extends LiveForm {
	constructor(x, y) {
		super(x, y);
		this.energy = 15;
		this.multiply = 0;
		this.directions = [];
	}
	getNewDirections() {
		this.directions = [
			[this.x, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x, this.y + 1]
		];
	}
	chooseCell(t) {
		this.getNewDirections();
		return super.chooseCell(t);
	}
	move() {
		var fundCords = this.chooseCell(0);
		var cord = random(fundCords);

		if (cord) {
			var x = cord[0];
			var y = cord[1];
			matrix[y][x] = 4;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		if (Grasshashiv > 700 && Grasshashiv < 2000) {

			var fundCords_1 = this.chooseCell(2);
			var fundCords_2 = this.chooseCell(3);
			var fundCords_3 = this.chooseCell(5);

			var fundCords = fundCords_1.concat(fundCords_2, fundCords_3);
			var cord = random(fundCords);

			if (cord) {
				var x = cord[0];
				var y = cord[1];
				matrix[y][x] = 4;
				matrix[this.y][this.x] = 0;

				this.x = x;
				this.y = y;

				this.multiply++;
				this.energy += 2;

				for (var i in redArr) {
					if (x == redArr[i].x && y == redArr[i].y) {
						RedEaterhashivDie++;
						redArr.splice(i, 1);
					}
				}
				for (var i in grassEaterArr) {
					if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
						GrassEaterhashivDie++;
						grassEaterArr.splice(i, 1);
					}
				}
				for (var i in chessArr) {
					if (x == chessArr[i].x && y == chessArr[i].y) {
						ChesshashivDie++;
						chessArr.splice(i, 1);
					}
				}
			}

			if (this.multiply > 1) {
				this.mul();
				this.multiply = 0;
			}
			else {
				this.move();
				this.energy--;
				if (this.energy < -5) {
					this.die();
				}
			}
		}
		else if (Grasshashiv < 700 || Grasshashiv > 2000) {

			var fundCords_1 = this.chooseCell(2);
			var fundCords_2 = this.chooseCell(3);
			var fundCords = fundCords_1.concat(fundCords_2);
			var cord = random(fundCords);

			if (cord) {
				var x = cord[0];
				var y = cord[1];		
				matrix[y][x] = 4;
		
				matrix[this.y][this.x] = 0;

				this.x = x;
				this.y = y;

				this.multiply++;
				this.energy += 2;

				for (var i in redArr) {
					if (x == redArr[i].x && y == redArr[i].y) {
						RedEaterhashivDie++;
						redArr.splice(i, 1);
					}
				}
				for (var i in grassEaterArr) {
					if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
						GrassEaterhashivDie++;
						grassEaterArr.splice(i, 1);
					}
				}
			}

			if (this.multiply > 3) {
				this.mul();
				this.multiply = 0;
			}
			else {
				this.move();
				this.energy--;
				if (this.energy < 0) {
					this.die();
				}
			}
		}
	}
	mul() {
		this.multiply += 2;
		var newCell = random(this.chooseCell(0));
		if (this.multiply >= 2 && newCell) {
			CreatGrasshashiv++;
			var newGras = new Creatgrass(newCell[0], newCell[1]);
			creatArr.push(newGras);
			matrix[newCell[1]][newCell[0]] = 4;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in creatArr) {
			if (this.x == creatArr[i].x && this.y == creatArr[i].y) {
				CreatGrasshashivDie++;
				creatArr.splice(i, 1);
			}
		}
	}
}
