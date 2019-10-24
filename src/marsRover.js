class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendCommand(command) {
        if (this.direction === DIRECTIONS.West) {
            return new MarsRover(DIRECTIONS.South);
        }
        if (this.direction === DIRECTIONS.South) {
            return new MarsRover(DIRECTIONS.East);
        }
        return new MarsRover(DIRECTIONS.West);
    }
};

const DIRECTIONS = {
    North: 'North', West: 'West', South: 'South' , East: 'East'
}, COMMANDS = {
    Left: 'L', Right: 'R'
};

Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS,
    COMMANDS: COMMANDS
};