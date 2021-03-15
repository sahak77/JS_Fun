var LiveForm = require("./LiveForm");
var random = require("./random.js");
module.exports = class Chess extends LiveForm {
	constructor(x, y) {
		super(x, y);
		this.multiply = 0;
		this.energy = 4;
		this.directions = [];
	}
	getNewDirections() {
		this.directions = [
			[this.x - 1, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y - 1],
			[this.x + 2, this.y + 1],
			[this.x - 1, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x - 2, this.y + 1],
			[this.x - 2, this.y - 1],
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
			matrix[y][x] = 5;
			matrix[this.y][this.x] = 0;
			this.x = x;
			this.y = y;
		}
	}
	eat() {
		if (Grasshashiv < 700 || Grasshashiv > 2000) {

			var fundCords_0 = this.chooseCell(1);
			var fundCords_1 = this.chooseCell(2);
			var fundCords_2 = this.chooseCell(3);
			var fundCords_3 = this.chooseCell(4);
			var fundCords = fundCords_0.concat(fundCords_1, fundCords_2, fundCords_3);
			var cord = random(fundCords);

			if (cord) {
				var x = cord[0];
				var y = cord[1];
				matrix[y][x] = 5;
				matrix[this.y][this.x] = 0;

				this.x = x;
				this.y = y;

				this.multiply++;
				this.energy++;

				for (var i in grassArr) {
					if (x == grassArr[i].x && y == grassArr[i].y) {
						GrasshashivDie++;
						grassArr.splice(i, 1);
					}
				}
				for (var i in grassEaterArr) {
					if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
						GrassEaterhashivDie++;
						grassEaterArr.splice(i, 1);
					}
				}
				for (var i in redArr) {
					if (x == redArr[i].x && y == redArr[i].y) {
						RedEaterhashivDie++;
						redArr.splice(i, 1);
					}
				}
				for (var i in creatArr) {
					if (x == creatArr[i].x && y == creatArr[i].y) {
						CreatGrasshashivDie++;
						creatArr.splice(i, 1);
					}
				}
				if (this.multiply > 25) {
					this.mul()
					this.multiply = 0;
				}
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
		this.multiply++;
		var newCell = random(this.chooseCell(0));
		if (this.multiply >= 3 && newCell) {
			Chesshashiv++;
			var newGrass = new Chess(newCell[0], newCell[1]);
			chessArr.push(newGrass);
			matrix[newCell[1]][newCell[0]] = 5;
			this.multiply = 0;
		}
	}
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in chessArr) {
			if (this.x == chessArr[i].x && this.y == chessArr[i].y) {
				ChesshashivDie++;
				chessArr.splice(i, 1);
			}
		}
	}
}