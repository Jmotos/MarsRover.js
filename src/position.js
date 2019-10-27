const Direction = require('./directions').Direction,
	DIRECTIONS = require('./directions').DIRECTIONS;

class Position {
	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	/**
	 * @param {Direction} direction
	 */
	moveForward(direction) {
		if (direction === DIRECTIONS.West) {
			return new Position(this.x, this.y - 1);
		}
		return new Position(this.x + 1, this.y);
	}
}

module.exports = Position;
