const Constants = require('../constants/Constants');

/**
 * Position class to show location of robots and move around map
 * @param {int} init x position
 * @param {int} init y position
 * @param {Enum} init orientation
 */
function Position(x, y, orientation) {
  this._x = x || 0;
  this._y = y || 0;
  this._orientation = orientation || Constants.ORIENTATION_NORTH;
  this._lost = false;
}

/**
 * @return {Enum} current orientation
 */
Position.prototype.getOrientation = function () {
  return this._orientation;
};
/**
 * Only updates if not lost
 * @param {Enum} new orientation
 */
Position.prototype.setOrientation = function (newOrientation) {
  if (!this.getLost()) this._orientation = newOrientation;
};

/**
 * @return {int} current x
 */
Position.prototype.getX = function () {
  return this._x;
};
/**
 * Only updates if not lost
 * @param {int} new x
 */
Position.prototype.setX = function (newX) {
  if (!this.getLost()) this._x = newX;
};

/**
 * @return {int} current y
 */
Position.prototype.getY = function () {
  return this._y;
};
/**
 * Only updates if not lost
 * @param {int} new y
 */
Position.prototype.setY = function (newY) {
  if (!this.getLost()) this._y = newY;
};

/**
 * @param {Object} coord object with x and y
 */
Position.prototype.setPosition = function (coord) {
  this.setX(coord.x);
  this.setY(coord.y);
};

/**
 * @return {bool} current lost flag state
 */
Position.prototype.getLost = function () {
  return this._lost;
};

/**
 * Trigger robot lost at a point, reset position and set flag
 * @param  {Object} coord object with x and y
 * @return {model/robot} return self for chaining
 */
Position.prototype.lostAt = function (coord) {
  this._lost = true;
  this._x = coord.x;
  this._y = coord.y;
  return this;
};
/**
 * Rotates robot to the left through 90 degrees
 * @return {model/robot} return self for chaining
 */
Position.prototype.rotateLeft = function () {
  let newOrientation;
  const currentOrientation = this.getOrientation();
  switch (currentOrientation) {
    case Constants.ORIENTATION_NORTH:
      newOrientation = Constants.ORIENTATION_WEST;
      break;
    case Constants.ORIENTATION_WEST:
      newOrientation = Constants.ORIENTATION_SOUTH;
      break;
    case Constants.ORIENTATION_SOUTH:
      newOrientation = Constants.ORIENTATION_EAST;
      break;
    case Constants.ORIENTATION_EAST:
      newOrientation = Constants.ORIENTATION_NORTH;
      break;
    default:
      throw new Error(`Unknown initial state for orientation ${currentOrientation}`);
  }
  this.setOrientation(newOrientation);
  return this;
};
/**
 * Rotates robot to the right through 90 degrees
 * @return {model/robot} return self for chaining
 */
Position.prototype.rotateRight = function () {
  let newOrientation;
  const currentOrientation = this.getOrientation();
  switch (currentOrientation) {
    case Constants.ORIENTATION_NORTH:
      newOrientation = Constants.ORIENTATION_EAST;
      break;
    case Constants.ORIENTATION_EAST:
      newOrientation = Constants.ORIENTATION_SOUTH;
      break;
    case Constants.ORIENTATION_SOUTH:
      newOrientation = Constants.ORIENTATION_WEST;
      break;
    case Constants.ORIENTATION_WEST:
      newOrientation = Constants.ORIENTATION_NORTH;
      break;
    default:
      throw new Error(`Unknown initial state for orientation ${currentOrientation}`);
  }
  this.setOrientation(newOrientation);
  return this;
};
/**
 * Moves robot one space forward in direction facing
 * @return {model/robot} return self for chaining
 */
Position.prototype.moveForward = function () {
  const currentOrientation = this.getOrientation();
  switch (currentOrientation) {
    case Constants.ORIENTATION_NORTH:
      this.setY(this.getY() + 1);
      break;
    case Constants.ORIENTATION_EAST:
      this.setX(this.getX() + 1);
      break;
    case Constants.ORIENTATION_SOUTH:
      this.setY(this.getY() - 1);
      break;
    case Constants.ORIENTATION_WEST:
      this.setX(this.getX() - 1);
      break;
    default:
      throw new Error(`Unknown state for orientation ${currentOrientation}`);
  }
  return this;
};

// Helper methods
/**
 * @return {string} current known position and lost flag as output string
 */
Position.prototype.printStatus = function () {
  return `${this.getX()} ${this.getY()} ${this.getOrientation()}${this.getLost() ? ' LOST' : ''}`;
};

/**
 * @return {Object} get coord object with x and y params
 */
Position.prototype.getCoord = function () {
  return {
    x: this.getX(),
    y: this.getY(),
  };
};

module.exports = Position;
