const Constants = require('../constants/Constants');
const Position = require('../models/position');

function Robot(id, box, x, y, orientation) {
  this._id = id;
  this._box = box;
  this._position = new Position(x, y, orientation);
}

Robot.prototype.getResult = function () {
  return this._position.printStatus();
};

Robot.prototype.runInstructions = function (instructions) {
  instructions.forEach(this.runInstruction.bind(this, this._position, this._box));
};
Robot.prototype.runInstruction = function (position, box, instruction) {
  const prevCoord = position.getCoord();
  switch (instruction) {
    case Constants.MOVE_LEFT:
      position.rotateLeft();
      break;
    case Constants.MOVE_RIGHT:
      position.rotateRight();
      break;
    case Constants.MOVE_FORWARD:
      position.moveForward();
      break;
    default:
      throw new Error(`Unknown instruction ${instruction}`);
  }
  const newCoord = position.getCoord();
  const lostPoint = box.getCrossPoint(prevCoord, newCoord);
  if (lostPoint !== Constants.LOST_NONE) {
    position.lostAt(lostPoint);
  }
};

module.exports = Robot;
