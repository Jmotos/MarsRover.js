class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendCommand(command) {
        return new MarsRover(this.direction.turnRight());
    }
};

const DIRECTIONS = {},
    COMMANDS = {
        Left: 'L', Right: 'R'
    };  

class Direction {
    constructor(name) {
        this.name = name;
    }
    toString() {
        return this.name;
    }
    setRight(right) {
        this.right = right;
    }
    turnRight() {
        return this.right;
    }
}

(function initializeDirectionsFactory() {
    DIRECTIONS.North = new Direction("North");
    DIRECTIONS.West = new Direction("West");
    DIRECTIONS.South = new Direction("South");
    DIRECTIONS.East = new Direction("East");
    DIRECTIONS.North.setRight(DIRECTIONS.West);
    DIRECTIONS.West.setRight(DIRECTIONS.South);
    DIRECTIONS.South.setRight(DIRECTIONS.East);
    DIRECTIONS.East.setRight(DIRECTIONS.North);
})()

Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS,
    COMMANDS: COMMANDS
};