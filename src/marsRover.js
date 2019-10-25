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
    setTurns(left, right) {
        this.left = left;
        this.right = right;
    }
    turnRight() {
        return this.right;
    }
    turnLeft() {
        return this.left;
    }
}

(function initializeDirectionsFactory() {
    function left(left) { return left; }
    function right(right) { return right; }

    DIRECTIONS.North = new Direction("North");
    DIRECTIONS.West = new Direction("West");
    DIRECTIONS.South = new Direction("South");
    DIRECTIONS.East = new Direction("East");
    DIRECTIONS.North.setTurns(left(DIRECTIONS.East), right(DIRECTIONS.West));
    DIRECTIONS.West.setTurns(left(DIRECTIONS.North), right(DIRECTIONS.South));
    DIRECTIONS.South.setTurns(left(DIRECTIONS.West), right(DIRECTIONS.East));
    DIRECTIONS.East.setTurns(left(DIRECTIONS.South), right(DIRECTIONS.North));
})()

Object.freeze(DIRECTIONS);

module.exports = {
    MarsRover: MarsRover,
    DIRECTIONS: DIRECTIONS,
    COMMANDS: COMMANDS
};