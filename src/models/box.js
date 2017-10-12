const Constants = require('../constants/Constants');

function Box(top, right, bottom, left) {
  this._left = left || 0;
  this._right = right || 0;
  this._top = top || 0;
  this._bottom = bottom || 0;
}

Box.prototype.getCrossPoint = function (start, end) {
  // TODO: Check if has left the box from start to end
  // return point where lost or LOST_NONE
  return Constants.LOST_NONE;
};

module.exports = Box;
