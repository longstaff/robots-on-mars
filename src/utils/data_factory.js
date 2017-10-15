const Constants = require('../constants/Constants');
const FileReader = require('./file_reader');
const FileWriter = require('./file_writer');

const factory = {
  /**
   * @param  {Enum} Data source type as constant
   * @return {utils/data_source} data source object
   */
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
  /**
   * @param  {Enum} Data sink type as constant
   * @return {utils/data_sink} data sink object
   */
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
