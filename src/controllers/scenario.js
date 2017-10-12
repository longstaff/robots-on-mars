const Robot = require('./robot');
const Box = require('../models/box');

function Scenario() {
  this._box = null;
  this._robots = [];
}
Scenario.prototype.initBox = function (width, height) {
  this._box = new Box(height, width);
};

Scenario.prototype.runRobot = function (x, y, orientation, instructions) {
  const newRobot = new Robot(this._robots.length, this._box, x, y, orientation);
  this._robots.push(newRobot);
  newRobot.runInstructions(instructions);
};

Scenario.prototype.getResults = function () {
  return this._robots.map(robot => robot.getResult());
};

module.exports = Scenario;
