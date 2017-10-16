const Robot = require('./robot');
const Box = require('../models/box');

/**
 * Scenario class to create and run all robots in bounds given.
 */
function Scenario() {
  this._box = null;
  this._robots = [];
}
/**
 * Init box model for the scenario based on width and height
 * @param  {int} width of the bounding box
 * @param  {int} height of the bounding box
 */
Scenario.prototype.initBox = function (width, height) {
  this._box = new Box(height, width);
};
/**
 * @return {model/box} Map box if scenario
 */
Scenario.prototype.getBox = function () {
  return this._box;
};

/**
 * Pass init and instructions to launch a new robot
 * @param  {int} init x
 * @param  {int} init y
 * @param  {Enum} init orientation
 * @param  {String[]} array of instructions for robot
 */
Scenario.prototype.runRobot = function (x, y, orientation, instructions) {
  const newRobot = new Robot(this._robots.length, this._box, x, y, orientation);
  this._robots.push(newRobot);
  newRobot.runInstructions(instructions);
};

/**
 * @return {model/robot[]} array of robots run in this scenario
 */
Scenario.prototype.getRobots = function () {
  return this._robots;
};

module.exports = Scenario;
