function DataSink() {}

/**
 * Datasink object for outputting robots position
 */
DataSink.prototype.init = function () {};

/**
 * Write out robots
 * @param  {models/robot[]} array of robots to output
 */
DataSink.prototype.writeData = function (robots) {
  console.log(robots);
};

module.exports = DataSink;
