const DataSource = require('./data_source');
const util = require('util');
const fs = require('fs');

/**
 * Class for reading data from file
 */
function FileReader() {
  this.init();
}

util.inherits(FileReader, DataSource);

/**
 * Get file data and parse it as async operation
 * @param  {string} file name to read from
 * @return {Promise} promise for async operation
 */
FileReader.prototype.readFile = function (fileName) {
  let mapCoords;
  const robots = [];
  let promisePass;
  let promiseRej;
  const promise = new Promise((pass, rej) => {
    promisePass = pass;
    promiseRej = rej;
  });

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      promiseRej(err);
    } else {
      try {
        const lines = data.split(/\r?\n/).filter(val => val.length);
        mapCoords = lines.shift();

        for (let i = 0; i < lines.length; i += 2) {
          robots.push({
            init: lines[i],
            instruction: lines[i + 1],
          });
        }
        this.readData(mapCoords, robots);
        promisePass(err);
      } catch (parseErr) {
        promiseRej(parseErr);
      }
    }
  });

  return promise;
};

module.exports = FileReader;
