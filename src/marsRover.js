const Direction = require('./directions').Direction,
	DIRECTIONS = require('./directions').DIRECTIONS,
	Position = require('./position'),
	COMMANDS = require('./commands').COMMANDS,
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
		/**
		 * @param {{ direction: Direction; position: Position; }} result
		 * @param {{ run: (direction: Direction, position: Position) => { newDirection: Direction; newPosition: Position; }; }} command
		 */
		function applyCommands(result, command) {
			let { newDirection, newPosition } = command.run(
				result.direction,
				result.position
			);
			return MarsRoverFactory.getRover(newDirection, newPosition);
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

module.exports = {
	MarsRover: MarsRoverFactory.getRover
};
