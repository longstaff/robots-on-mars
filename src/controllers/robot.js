const Constants = require('../constants/Constants');
const Position = require('../models/position');

/**
 * Robot class representing robot on Mars to be given instructions and reveal position at end
 * @param {int} Unique identifier of this Robot
 * @param {models/box} Containing box for the robot to move in
 * @param {int} init X coord
 * @param {int} init Y coord
 * @param {Enum} init orientation for robot
 */
function Robot(id, box, x, y, orientation) {
  this._id = id;
  this._box = box;
  this._position = new Position(x, y, orientation);
  this._history = [];
}

/**
 * Format data into string for output
 * @return {string} position at the end of the instruction
 */
Robot.prototype.getResult = function () {
  return this._position.printStatus();
};
/**
 * Format data into string for output
 * @return {string} position at the end of the instruction
 */
Robot.prototype.getHistory = function () {
  return this._history;
};
/**
 * Format data into string for output
 * @return {string} position at the end of the instruction
 */
Robot.prototype.addHistory = function (coord, lost, orientation) {
  this._history.push({
    isLost: lost,
    x: coord.x,
    y: coord.y,
    orientation: orientation,
  });

  console.log("Add to history", this._history)
};

/**
 * @param  {String[]} List of instructions to run
 */
Robot.prototype.runInstructions = function (instructions) {
  instructions.forEach(this.runInstruction.bind(this, this._position, this._box));
};
/**
 * @param  {model/position} position model for robot
 * @param  {model/box} box model for the robot
 * @param  {string} instruction to apply to robot
 */
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
  const boundaryPoint = box.getCrossPoint(prevCoord, newCoord);
  if (boundaryPoint !== Constants.LOST_NONE) {
    if (boundaryPoint.isLost) position.lostAt(boundaryPoint);
    else position.setPosition(boundaryPoint);
  }

  this.addHistory(position.getCoord(), position.getLost(), position.getOrientation());
};

module.exports = Robot;
