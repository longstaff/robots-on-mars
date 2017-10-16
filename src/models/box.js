const Constants = require('../constants/Constants');

/**
 * Box class to represent bounding box of the robots and record previous lost points
 * @param {int} max y of scenario
 * @param {int} max x of scenario
 * @param {int} min y of scenario
 * @param {int} min x of scenario
 */
function Box(top, right, bottom, left) {
  this._left = left || 0;
  this._right = right || 0;
  this._top = top || 0;
  this._bottom = bottom || 0;

  this._crossPoints = [];
}
/**
 * @return {int} width of bounding box
 */
Box.prototype.getWidth = function () {
  return this._right - this._left;
};
/**
 * @return {int} height of bounding box
 */
Box.prototype.getHeight = function () {
  return this._top - this._bottom;
};

/**
 * Test to see if movement has moved over the boundary of the map
 * @param  {Object} Coodinate object with x and y of start point
 * @param  {Object} Coodinate object with x and y of end point
 * @return {Object} Coordinate of crossing boundary or LOST_NONE constant if not crossed
 */
Box.prototype.getCrossPoint = function (start, end) {
  let cross = null;

  if (start.x > end.x) {
    if (end.x < this._left) cross = this.addCrossPoint(this._left, start.y);
  } else if (start.x < end.x) {
    if (end.x >= this._right) cross = this.addCrossPoint(this._right, start.y);
  } else if (start.y > end.y) {
    if (end.x < this._bottom) cross = this.addCrossPoint(start.x, this._bottom);
  } else if (start.y < end.y) {
    if (end.x >= this._top) cross = this.addCrossPoint(start.x, this._top);
  }

  return cross !== null ? cross : Constants.LOST_NONE;
};

/**
 * Add a crossing point to the list, if previously crossed do not trigger lost
 * @param {int} x position of crossing
 * @param {int} y position of crossing
 * @return {Object} Coordinate of crossing boundary with isLost flag
 */
Box.prototype.addCrossPoint = function (x, y) {
  const crossPoint = { x, y, isLost: false };
  if (!this.isCrossingPoint(crossPoint)) {
    this._crossPoints.push(crossPoint);
    crossPoint.isLost = true;
  }
  return crossPoint;
};
/**
 * Check if this location previously crossed
 * @param  {Object} coord object to check
 * @return {Boolean}
 */
Box.prototype.isCrossingPoint = function (coord) {
  return !!this._crossPoints.find(point => point.x === coord.x && point.y === coord.y);
};

module.exports = Box;
