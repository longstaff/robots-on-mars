const Scenario = require('./controllers/scenario');

// TODO: Read in lines from file
const mapCoords = '5 3';
const robot1Init = '1 1 E';
const robot1Instruction = 'RFRFRFRF';
const robot2Init = '3 2 N';
const robot2Instruction = 'FRRFLLFFRRFLL';
const robot3Init = '0 3 W';
const robot3Instruction = 'LLFFFLFLFL';

const scenario = new Scenario();
const robots = [
  { init: robot1Init, instruction: robot1Instruction },
  { init: robot2Init, instruction: robot2Instruction },
  { init: robot3Init, instruction: robot3Instruction },
];

const letBoxCoords = mapCoords.split(' ').map(val => parseInt(val, 10));
scenario.initBox(letBoxCoords[0], letBoxCoords[1]);

robots.forEach((val) => {
  const init = val.init.split(' ');
  const x = parseInt(init[0], 10);
  const y = parseInt(init[1], 10);
  const orientation = init[2];
  const instructions = val.instruction.split('');
  scenario.runRobot(x, y, orientation, instructions);
});

// TODO: Log out in some helpful format
console.log(scenario.getResults());
