const Constants = require('../constants/Constants');
const FileReader = require('./file_reader');
const FileWriter = require('./file_writer');

const factory = {
  getDataSource: (type) => {
    let dataSource;
    switch (type) {
      case Constants.DATA_FILE:
        dataSource = new FileReader();
        break;
      default:
        throw new Error(`No such data source ${type}`);
    }
    return dataSource;
  },
  makeDataOutput: (type, data) => {
    let dataSource;
    switch (type) {
      case Constants.DATA_FILE:
        dataSource = new FileWriter(data);
        break;
      default:
        throw new Error(`No such data output ${type}`);
    }
    return dataSource;
  },
};

module.exports = factory;
