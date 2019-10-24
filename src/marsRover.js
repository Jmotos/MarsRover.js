class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendCommand(command) {
        return new MarsRover(DIRECTIONS.West);
    }
};

const DIRECTIONS = {
    North: 'N', West: 'W', South: 'S' , East: 'E'
}, COMMANDS = {
    Left: 'L', Right: 'R'
};

Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS,
    COMMANDS: COMMANDS
};