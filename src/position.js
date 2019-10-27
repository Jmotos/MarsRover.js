class Position {
	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	moveForward() {
		return new Position(this.x + 1, this.y);
	}
}

module.exports = Position;
