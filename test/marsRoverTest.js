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

	/**
	 * @param {() => void} done
	 * @param {{ initial: Direction; final: Direction; }} value
	 */
	itParam(
		'When Rover facing ${value.initial} in position moves Forward, ends in position ${value.final}',
		[
			{
				initial: { direction: DIRECTIONS.North, x: 0, y: 0 },
				final: { direction: DIRECTIONS.North, x: 1, y: 0 }
			},
			{
				initial: { direction: DIRECTIONS.West, x: 0, y: 0 },
				final: { direction: DIRECTIONS.West, x: 0, y: -1 }
			}
		],
		(done, value) => {
			let initialRover = {
					direction: value.initial.direction,
					position: new Position(value.initial.x, value.initial.y)
				},
				finalRover = {
					direction: value.final.direction,
					position: new Position(value.final.x, value.final.y)
				};
			roverMoving(COMMANDS.Forward, initialRover, finalRover);
			done();
		}
	);

	/**
	 * @param {String} command
	 * @param {Direction} initial
	 * @param {Direction} final
	 */
	function roverTurning(command, initial, final) {
		let marsRover = GetMarsRover(initial, null),
			result = marsRover.sendCommand(command);
		result.should.be.eql(GetMarsRover(final, null));
	}
	/**
	 * @param {String} command
	 * @param {{direction: Direction, position: Position}} initial
	 * @param {{direction: Direction, position: Position}} final
	 */
	function roverMoving(command, initial, final) {
		let marsRover = GetMarsRover(initial.direction, initial.position),
			result = marsRover.sendCommand(command);
		result.should.be.eql(GetMarsRover(final.direction, final.position));
	}
});
