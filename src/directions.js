const Position = require('./position');

class Direction {
	/**
	 * @param {String} name
	 * @param {{ x: number; y: number; }} forward
	 */
	constructor(name, forward) {
		this.name = name;
		this.forward = forward;
	}
	toString() {
		return this.name;
	}
	/**
	 * @param {Direction} left
	 * @param {Direction} right
	 */
	setTurns(left, right) {
		this.left = left;
		this.right = right;
	}
	/**
	 * @param {Position} position
	 */
	moveForward(position) {
		return new Position(
			position.x + this.forward.x,
			position.y + this.forward.y
		);
	}
	/**
	 * @param {Position} position
	 */
	moveBackward(position) {
		return new Position(
			position.x - this.forward.x,
			position.y - this.forward.y
		);
	}
}

const DIRECTIONS = {
	North: new Direction('North', { x: 1, y: 0 }),
	West: new Direction('West', { x: 0, y: -1 }),
	South: new Direction('South', { x: -1, y: 0 }),
	East: new Direction('East', { x: 0, y: 1 })
};

(function initializeDirections() {
	DIRECTIONS.North.setTurns(DIRECTIONS.East, DIRECTIONS.West);
	DIRECTIONS.West.setTurns(DIRECTIONS.North, DIRECTIONS.South);
	DIRECTIONS.South.setTurns(DIRECTIONS.West, DIRECTIONS.East);
	DIRECTIONS.East.setTurns(DIRECTIONS.South, DIRECTIONS.North);
})();

Object.freeze(DIRECTIONS);

module.exports = {
	DIRECTIONS: DIRECTIONS,
	Direction: Direction
};
