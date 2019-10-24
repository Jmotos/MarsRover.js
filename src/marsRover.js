class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendCommand(command) {
        if (this.direction === DIRECTIONS.West) {
            return new MarsRover(DIRECTIONS.South);
        }
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