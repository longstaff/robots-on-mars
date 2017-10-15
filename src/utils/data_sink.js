function DataSink() {}

DataSink.prototype.init = function () {};

DataSink.prototype.writeData = function (robots) {
  console.log(robots);
};

module.exports = DataSink;
