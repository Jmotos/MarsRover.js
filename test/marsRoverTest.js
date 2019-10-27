const chai = require('chai'),
	itParam = require('mocha-param'),
	should = chai.should(),
	MarsRover = require('../src/marsRover').MarsRover,
	DIRECTIONS = require('../src/marsRover').DIRECTIONS,
	COMMANDS = require('../src/marsRover').COMMANDS,
	Direction = require('../src/marsRover').Direction;

describe('Unit test batery of Mars Rover', () => {
	/**
	 * @param {() => void} done
	 * @param {{ initial: Direction; final: Direction; }} value
	 */
	itParam(
		'When Rover facing ${value.initial} and turn right, ends facing ${value.final}',
		[
			{ initial: DIRECTIONS.North, final: DIRECTIONS.West },
			{ initial: DIRECTIONS.West, final: DIRECTIONS.South },
			{ initial: DIRECTIONS.South, final: DIRECTIONS.East },
			{ initial: DIRECTIONS.East, final: DIRECTIONS.North }
		],
		(done, value) => {
			roverTurning(COMMANDS.Right, value.initial, value.final);
			done();
		}
	);

	/**
	 * @param {() => void} done
	 * @param {{ initial: Direction; final: Direction; }} value
	 */
	itParam(
		'When Rover facing ${value.initial} and turn left, ends facing ${value.final}',
		[
			{ initial: DIRECTIONS.North, final: DIRECTIONS.East },
			{ initial: DIRECTIONS.East, final: DIRECTIONS.South },
			{ initial: DIRECTIONS.South, final: DIRECTIONS.West },
			{ initial: DIRECTIONS.West, final: DIRECTIONS.North }
		],
		(done, value) => {
			roverTurning(COMMANDS.Left, value.initial, value.final);
			done();
		}
	);

	/**
	 * @param {string} command
	 * @param {Direction} initialDirection
	 * @param {Direction} finalDirection
	 */
	function roverTurning(command, initialDirection, finalDirection) {
		let marsRover = new MarsRover(initialDirection),
			result = marsRover.sendCommand(command);
		result.should.be.eql(new MarsRover(finalDirection));
	}
});
