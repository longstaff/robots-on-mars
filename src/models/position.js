const Constants = require('../constants/Constants');

function Position(x, y, orientation) {
  this._x = x || 0;
  this._y = y || 0;
  this._orientation = orientation || Constants.ORIENTATION_NORTH;
  this._lost = false;
}

Position.prototype.getOrientation = function () {
  return this._orientation;
};
Position.prototype.setOrientation = function (newOrientation) {
  if (!this.getLost()) this._orientation = newOrientation;
};

Position.prototype.getX = function () {
  return this._x;
};
Position.prototype.setX = function (newX) {
  if (!this.getLost()) this._x = newX;
};

Position.prototype.getY = function () {
  return this._y;
};
Position.prototype.setY = function (newY) {
  if (!this.getLost()) this._y = newY;
};

Position.prototype.getLost = function () {
  return this._lost;
};
Position.prototype.lostAt = function (x, y) {
  this._lost = true;
  if (x !== undefined) this._x = x;
  if (y !== undefined) this._y = y;
  return this;
};

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
Position.prototype.printStatus = function () {
  return `${this.getX()} ${this.getY()} ${this.getOrientation()}${this.getLost() ? ' LOST' : ''}`;
};

Position.prototype.getCoord = function () {
  return {
    x: this.getX(),
    y: this.getY(),
  };
};

module.exports = Position;
