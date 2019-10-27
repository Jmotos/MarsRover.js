const Position = require('./position'),
	Direction = require('./directions').Direction;

class Command {
	/**
	 * @param {String} name
	 * @param {{ (direction: Direction, position: Position): { newDirection: Direction; newPosition: Position; }; }} runFunction
	 */
	constructor(name, runFunction) {
		this.name = name;
		this.run = runFunction;
	}
	toString() {
		return this.name;
	}
}

const COMMANDS = {
	Left: new Command('L', (direction, position) => {
		return { newDirection: direction.left, newPosition: position };
	}),
	Right: new Command('R', (direction, position) => {
		return { newDirection: direction.right, newPosition: position };
	}),
	Forward: new Command('F', (direction, position) => {
		return {
			newDirection: direction,
			newPosition: direction.moveForward(position)
		};
	}),
	Backward: new Command('B', null)
};
Object.freeze(COMMANDS);

module.exports = {
	COMMANDS: COMMANDS,
	Command: Command
};
