/**
 * Data source object for reading in init data for scenario
 */
function DataSource() {}

/**
 * init map data and robot data
 */
DataSource.prototype.init = function () {
  this._mapData = null;
  this._robotData = null;
};

/**
 * Map read data into internal data
 * @param  {string} map coords as "x y"
 * @param  {array} array of objects representing robots {init: "", instruction: ""}
 */
DataSource.prototype.readData = function (mapCoords, robots) {
  const boxCoords = mapCoords.split(' ').map(val => parseInt(val, 10));
  this._mapData = { x: boxCoords[0], y: boxCoords[1] };

  this._robotData = robots.map((val) => {
    const init = val.init.split(' ');
    const x = parseInt(init[0], 10);
    const y = parseInt(init[1], 10);
    const orientation = init[2];
    const instructions = val.instruction.split('');

    return {
      x,
      y,
      orientation,
      instructions,
    };
  });
};

/**
 * @return {Object} return coord object with max x and y for bounding map
 */
DataSource.prototype.getMapData = function () {
  return this._mapData;
};
/**
 * @return {Array} array of objects for robot init and instructions
 */
DataSource.prototype.getRobotData = function () {
  return this._robotData;
};

module.exports = DataSource;
