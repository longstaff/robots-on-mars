const DataSink = require('./data_sink');
const util = require('util');
const fs = require('fs');

/**
 * Class for writing output text file
 * @param {string}
 */
function FileWriter(fileName) {
  this.init();
  this._fileName = fileName || 'output.txt';
}

util.inherits(FileWriter, DataSink);

/**
 * @param  {models/robot[]} array of robots for output
 * @param  {string} override filename if needed
 * @return {Promise} promise for async operation
 */
FileWriter.prototype.writeData = function (robots, box, fileName) {
  let promisePass;
  let promiseRej;
  const promise = new Promise((pass, rej) => {
    promisePass = pass;
    promiseRej = rej;
  });

  fs.writeFile(fileName || this._fileName, robots.map(robot => robot.getResult()).join('\n'), 'utf8', (err) => {
    if (err) {
      promiseRej(`File write error ${err}`);
    } else {
      promisePass();
    }
  });

  return promise;
};

module.exports = FileWriter;
