const chai = require('chai'),
    should = chai.should(),
    MarsRover = require('../src/marsRover').MarsRover,
    DIRECTIONS = require('../src/marsRover').DIRECTIONS,
    COMMANDS = require('../src/marsRover').COMMANDS;

describe('Unit test batery of Mars Rover', () => {

    it('when Rover facing North and turn right, ends facing West', () => {
        roverTurningRight(DIRECTIONS.North, faces(DIRECTIONS.West))
    });
    it('when Rover facing West and turn right, ends facing South', () => {
        roverTurningRight(DIRECTIONS.West, faces(DIRECTIONS.South))
    });
    it('when Rover facing South and turn right, ends facing East', () => {
        roverTurningRight(DIRECTIONS.South, faces(DIRECTIONS.East))
    });

    function roverTurningRight(initialDirection, finalDirection) {
        let marsRover = new MarsRover(initialDirection),
            result = marsRover.sendCommand(COMMANDS.Right);

        result.should.be.eql(new MarsRover(finalDirection));
    }

    function faces(direction) {
        return direction;
    }
});