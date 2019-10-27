const CommandTranslator = require('./commandTranslator'),
	CommandGenericTranslator = new CommandTranslator.CommandTranslator(),
	commandStringTranslator = new CommandTranslator.CommandStringTranslator();

class MarsRover {
	/**
	 * @param {Direction} direction
	 * @param {CommandGenericTranslator} commandTranslator
	 */
	constructor(direction, commandTranslator) {
		this.direction = direction || DIRECTIONS.North;
		this.commandTranslator = commandTranslator;
	}
	/**
	 * @param {String} commands
	 */
	sendCommand(commands) {
		return this.commandTranslator
			.translate(commands)
			.reduce((result, command) => {
				if (command === COMMANDS.Left) {
					return new MarsRoverStringCommandFactory(
						result.direction.turnLeft()
					);
				}
				return new MarsRoverStringCommandFactory(
					result.direction.turnRight()
				);
			}, this);
	}
}

class MarsRoverStringCommandFactory {
	/**
	 * @param {Direction} direction
	 * @returns MarsRover
	 */
	constructor(direction) {
		return new MarsRover(direction, commandStringTranslator);
	}
}

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
	},
	COMMANDS = {
		Left: 'L',
		Right: 'R'
	};

(function initializeDirectionsFactory() {
	DIRECTIONS.North.setTurns(DIRECTIONS.East, DIRECTIONS.West);
	DIRECTIONS.West.setTurns(DIRECTIONS.North, DIRECTIONS.South);
	DIRECTIONS.South.setTurns(DIRECTIONS.West, DIRECTIONS.East);
	DIRECTIONS.East.setTurns(DIRECTIONS.South, DIRECTIONS.North);
})();

Object.freeze(DIRECTIONS);

module.exports = {
	MarsRover: MarsRoverStringCommandFactory,
	DIRECTIONS: DIRECTIONS,
	COMMANDS: COMMANDS,
	Direction: Direction
};
