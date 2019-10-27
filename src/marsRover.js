const Direction = require('./directions').Direction,
	DIRECTIONS = require('./directions').DIRECTIONS,
	CommandTranslator = require('./commandTranslator'),
	CommandGenericTranslator = CommandTranslator.CommandTranslator,
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
		function applyCommands(result, command) {
			if (command === COMMANDS.Left) {
				return MarsRoverFactory.getRover(result.direction.turnLeft());
			}
			return MarsRoverFactory.getRover(result.direction.turnRight());
		}

		return this.commandTranslator
			.translate(commands)
			.reduce(applyCommands, this);
	}
}

class MarsRoverFactory {
	/**
	 * @param {Direction} direction
	 * @returns {MarsRover}
	 */
	static getRover(direction) {
		return new MarsRover(direction, commandStringTranslator);
	}
}

const COMMANDS = {
	Left: 'L',
	Right: 'R'
};
Object.freeze(COMMANDS);

module.exports = {
	MarsRover: MarsRoverFactory.getRover,
	COMMANDS: COMMANDS
};
