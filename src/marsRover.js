const Direction = require('./directions').Direction,
	DIRECTIONS = require('./directions').DIRECTIONS,
	CommandTranslator = require('./commandTranslator'),
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
					return MarsRoverCommandFactory.getMarsRoverStringCommand(
						result.direction.turnLeft()
					);
				}
				return MarsRoverCommandFactory.getMarsRoverStringCommand(
					result.direction.turnRight()
				);
			}, this);
	}
}

class MarsRoverCommandFactory {
	/**
	 * @param {Direction} direction
	 * @returns {MarsRover}
	 */
	static getMarsRoverStringCommand(direction) {
		return new MarsRover(direction, commandStringTranslator);
	}
}

const COMMANDS = {
	Left: 'L',
	Right: 'R'
};
Object.freeze(COMMANDS);

module.exports = {
	MarsRover: MarsRoverCommandFactory.getMarsRoverStringCommand,
	COMMANDS: COMMANDS
};
