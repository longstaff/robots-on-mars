const Constants = require('./constants/Constants');
const Scenario = require('./controllers/scenario');
const Factory = require('./utils/data_factory');

const inputFileName = 'input.txt';
const outputFileName = 'output.txt';
const inputType = Constants.DATA_FILE;
const outputType = Constants.DATA_FILE;

const scenario = new Scenario();
const reader = Factory.getDataSource(inputType);

reader.readFile(inputFileName).then(() => {
  const mapCoords = reader.getMapData();
  const robots = reader.getRobotData();

  if (mapCoords && robots && robots.length) {
    scenario.initBox(mapCoords.x, mapCoords.y);

    robots.forEach((val) => {
      scenario.runRobot(val.x, val.y, val.orientation, val.instructions);
    });
  } else {
    console.log('Error, no data to be read');
  }
}, (err) => {
  console.log(`Error reading data ${err}`);
}).then(() => {
  const outputRobots = scenario.getRobots();
  if (outputRobots && outputRobots.length) {
    const writer = Factory.makeDataOutput(outputType, outputFileName);
    writer.writeData(outputRobots).then(() => {
      console.log(`Data output to ${outputFileName}`);
    }, (err) => {
      console.log(`Error writing data ${err}`);
    });
  }
});
