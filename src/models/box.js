const Constants = require('../constants/Constants');

function Box(top, right, bottom, left) {
  this._left = left || 0;
  this._right = right || 0;
  this._top = top || 0;
  this._bottom = bottom || 0;

  this._crossPoints = [];
}

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

Box.prototype.addCrossPoint = function (x, y) {
  const crossPoint = { x, y, isLost: false };
  if (!this.isCrossingPoint(crossPoint)) {
    this._crossPoints.push(crossPoint);
    crossPoint.isLost = true;
  }
  return crossPoint;
};
Box.prototype.isCrossingPoint = function (coord) {
  return !!this._crossPoints.find(point => point.x === coord.x && point.y === coord.y);
};

module.exports = Box;
