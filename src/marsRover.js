class MarsRover {
    constructor(direction) {
        this.direction = direction || DIRECTIONS.North;
    }
    sendCommand(command) {
        if (command === COMMANDS.Left) {
            return new MarsRover(this.direction.turnLeft());
        }
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
    setLeft(left) {
        this.left = left;
    }
    turnRight() {
        return this.right;
    }
    turnLeft() {
        return this.left;
    }
}

(function initializeDirectionsFactory() {
    DIRECTIONS.North = new Direction("North");
    DIRECTIONS.West = new Direction("West");
    DIRECTIONS.South = new Direction("South");
    DIRECTIONS.East = new Direction("East");
    DIRECTIONS.North.setRight(DIRECTIONS.West);
    DIRECTIONS.North.setLeft(DIRECTIONS.East);
    DIRECTIONS.West.setRight(DIRECTIONS.South);
    DIRECTIONS.South.setRight(DIRECTIONS.East);
    DIRECTIONS.South.setLeft(DIRECTIONS.West);
    DIRECTIONS.East.setRight(DIRECTIONS.North);
    DIRECTIONS.East.setLeft(DIRECTIONS.South);
})()

Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS,
    COMMANDS: COMMANDS
};