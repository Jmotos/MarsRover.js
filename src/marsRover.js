const Direction = require('./directions').Direction,
	DIRECTIONS = require('./directions').DIRECTIONS,
	Position = require('./position'),
	CommandTranslator = require('./commandTranslator'),
	CommandGenericTranslator = CommandTranslator.CommandTranslator,
	commandStringTranslator = new CommandTranslator.CommandStringTranslator();

class MarsRover {
	/**
	 * @param {Direction} direction
	 * @param {Position} position
	 * @param {CommandGenericTranslator} commandTranslator
	 */
	constructor(direction, position, commandTranslator) {
		this.direction = direction;
		this.position = position;
		this.commandTranslator = commandTranslator;
	}
	/**
	 * @param {String} commands
	 */
	sendCommand(commands) {
		function applyCommands(result, command) {
			if (command === COMMANDS.Forward) {
				return MarsRoverFactory.getRover(
					result.direction,
					result.position.moveForward()
				);
			}
			if (command === COMMANDS.Left) {
				return MarsRoverFactory.getRover(
					result.direction.turnLeft(),
					result.position
				);
			}
			return MarsRoverFactory.getRover(
				result.direction.turnRight(),
				result.position
			);
		}

		return this.commandTranslator
			.translate(commands)
			.reduce(applyCommands, this);
	}
}

class MarsRoverFactory {
	/**
	 * @param {Direction} direction
	 * @param {Position} position
	 * @returns {MarsRover}
	 */
	static getRover(direction, position) {
		return new MarsRover(
			direction || DIRECTIONS.North,
			position || new Position(0, 0),
			commandStringTranslator
		);
	}
}

const COMMANDS = {
	Left: 'L',
	Right: 'R',
	Forward: 'F',
	Backward: 'B'
};
Object.freeze(COMMANDS);

module.exports = {
	MarsRover: MarsRoverFactory.getRover,
	COMMANDS: COMMANDS
};
