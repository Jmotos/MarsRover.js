const chai = require('chai'),
    itParam = require('mocha-param'),
    should = chai.should(),
    MarsRover = require('../src/marsRover').MarsRover,
    DIRECTIONS = require('../src/marsRover').DIRECTIONS,
    COMMANDS = require('../src/marsRover').COMMANDS;

describe('Unit test batery of Mars Rover', () => {

    itParam('When Rover facing ${value.initial} and turn right, ends facing ${value.final}', 
    [{ initial: DIRECTIONS.North, final: DIRECTIONS.West },
     { initial: DIRECTIONS.West, final: DIRECTIONS.South },
     { initial: DIRECTIONS.South, final: DIRECTIONS.East},
     { initial: DIRECTIONS.East, final: DIRECTIONS.North}], (done, value) => {
        roverTurningRight(value.initial, faces(value.final));
        done();
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