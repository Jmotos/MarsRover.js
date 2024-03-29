const chai = require('chai'),
	itParam = require('mocha-param'),
	should = chai.should(),
	MarsRover = require('../src/marsRover'),
	DIRECTIONS = require('../src/directions').DIRECTIONS,
	COMMANDS = require('../src/commands').COMMANDS,
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
			roverTurning(COMMANDS.Right.toString(), value.initial, value.final);
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
			roverTurning(COMMANDS.Left.toString(), value.initial, value.final);
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
		'When Rover facing ${value.initial.direction} in position ' +
			'(${value.initial.x}, ${value.initial.y}) moves Forward, ' +
			'ends in position (${value.final.x}, ${value.final.y})',
		[
			{
				initial: { direction: DIRECTIONS.North, x: 0, y: 0 },
				final: { direction: DIRECTIONS.North, x: 1, y: 0 }
			},
			{
				initial: { direction: DIRECTIONS.West, x: 0, y: 0 },
				final: { direction: DIRECTIONS.West, x: 0, y: -1 }
			},
			{
				initial: { direction: DIRECTIONS.South, x: 0, y: 0 },
				final: { direction: DIRECTIONS.South, x: -1, y: 0 }
			},
			{
				initial: { direction: DIRECTIONS.East, x: 0, y: 0 },
				final: { direction: DIRECTIONS.East, x: 0, y: 1 }
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
			roverMoving(COMMANDS.Forward.toString(), initialRover, finalRover);
			done();
		}
	);

	/**
	 * @param {() => void} done
	 * @param {{ initial: Direction; final: Direction; }} value
	 */
	itParam(
		'When Rover facing ${value.initial.direction} in position ' +
			'(${value.initial.x}, ${value.initial.y}) moves Backward, ' +
			'ends in position (${value.final.x}, ${value.final.y})',
		[
			{
				initial: { direction: DIRECTIONS.North, x: 0, y: 0 },
				final: { direction: DIRECTIONS.North, x: -1, y: 0 }
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
			roverMoving(COMMANDS.Backward.toString(), initialRover, finalRover);
			done();
		}
	);

	/**
	 * @param {String} command
	 * @param {Direction} initial
	 * @param {Direction} final
	 */
	function roverTurning(command, initial, final) {
		let marsRover = new MarsRover(initial, null),
			result = marsRover.sendCommand(command);
		result.should.be.eql(new MarsRover(final, null));
	}

	/**
	 * @param {String} command
	 * @param {{direction: Direction, position: Position}} initial
	 * @param {{direction: Direction, position: Position}} final
	 */
	function roverMoving(command, initial, final) {
		let marsRover = new MarsRover(initial.direction, initial.position),
			result = marsRover.sendCommand(command);
		result.should.be.eql(new MarsRover(final.direction, final.position));
	}
});
