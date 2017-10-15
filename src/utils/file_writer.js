const DataSink = require('./data_sink');
const util = require('util');
const fs = require('fs');

function FileWriter(fileName) {
  this.init();
  this._fileName = fileName || 'output.txt';
}

util.inherits(FileWriter, DataSink);

FileWriter.prototype.writeData = function (robots) {
  let promisePass;
  let promiseRej;
  const promise = new Promise((pass, rej) => {
    promisePass = pass;
    promiseRej = rej;
  });

  fs.writeFile(this._fileName, robots.map(robot => robot.getResult()).join('\n'), 'utf8', (err) => {
    if (err) {
      promiseRej(`File write error ${err}`);
    } else {
      promisePass();
    }
  });

  return promise;
};

module.exports = FileWriter;
