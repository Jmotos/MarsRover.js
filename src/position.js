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
		if (direction === DIRECTIONS.South) {
			return new Position(this.x - 1, this.y);
		}
		return new Position(this.x + 1, this.y);
	}
}

module.exports = Position;
