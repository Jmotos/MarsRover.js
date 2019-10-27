class Direction {
	/**
	 * @param {String} name
	 */
	constructor(name) {
		this.name = name;
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
	turnRight() {
		return this.right;
	}
	turnLeft() {
		return this.left;
	}
}

const DIRECTIONS = {
	North: new Direction('North'),
	West: new Direction('West'),
	South: new Direction('South'),
	East: new Direction('East')
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
