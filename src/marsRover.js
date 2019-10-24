class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendSignal() {
        return new MarsRover(DIRECTIONS.West);
    }
};

const DIRECTIONS = {
    North: 'N', West: 'W', South: 'S' , East: 'E'
};
Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS
};