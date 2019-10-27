const chai = require('chai'),
	itParam = require('mocha-param'),
	should = chai.should(),
	GetMarsRover = require('../src/marsRover').MarsRover,
	DIRECTIONS = require('../src/directions').DIRECTIONS,
	COMMANDS = require('../src/marsRover').COMMANDS,
	Direction = require('../src/directions').Direction,
	Position = require('../src/position');

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

	it('When Rover recives some commands, it applies all of them', () => {
		let commands = 'LL';
		roverTurning(commands, DIRECTIONS.North, DIRECTIONS.South);
	});

	it('When Rover facing North in position (x, y) moves Forward, ends in position (x+1, y)', () => {
		let initialRover = {
				direction: DIRECTIONS.North,
				position: new Position(0, 0)
			},
			finalRover = {
				direction: DIRECTIONS.North,
				position: new Position(1, 0)
			};
		roverMoving(COMMANDS.Forward, initialRover, finalRover);
	});

	/**
	 * @param {String} command
	 * @param {Direction} initialDirection
	 * @param {Direction} finalDirection
	 */
	function roverTurning(command, initialDirection, finalDirection) {
		let marsRover = GetMarsRover(initialDirection, null),
			result = marsRover.sendCommand(command);
		result.should.be.eql(GetMarsRover(finalDirection, null));
	}
	/**
	 * @param {String} command
	 * @param {{direction: Direction, position: Position}} initialRover
	 * @param {{direction: Direction, position: Position}} finalRover
	 */
	function roverMoving(command, initialRover, finalRover) {
		let marsRover = GetMarsRover(
				initialRover.direction,
				initialRover.position
			),
			result = marsRover.sendCommand(COMMANDS.Forward);
		result.should.be.eql(
			GetMarsRover(finalRover.direction, finalRover.position)
		);
	}
});
