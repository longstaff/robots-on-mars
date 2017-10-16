const Constants = require('../constants/Constants');
const DataSink = require('./data_sink');
const util = require('util');
const fs = require('fs');

const MUTIPLIER = 50;
const TIME = 0.5;

/**
 * Class for writing output text file
 * @param {string}
 */
function HtmlWriter(fileName) {
  this.init();
  this._fileName = fileName || 'output.html';
}

util.inherits(HtmlWriter, DataSink);

/**
 * @param  {models/robot[]} array of robots for output
 * @param  {string} override filename if needed
 * @return {Promise} promise for async operation
 */
HtmlWriter.prototype.writeData = function (robots, box, fileName) {
/*
  paddingStart = 0;
  paddingEnd = 0;
*/
  const totalFrames = robots.reduce((count, robot) => count + robot.getHistory().length, 0);
  const perStep = 100 / totalFrames;
  const robotCss = robots.map((robot, int, arr) => {
    const history = robot.getHistory();
    const padding = int === 0 ? 0 : arr.slice(int - 1).reduce((count, r) => count + r.getHistory().length, 0);

    const frameStart = int === 0 ? '' : this.getKeyframe('0%', history[0], false);
    const frames = history.map((step, hisInt) => this.getKeyframe(this.getPosition(hisInt, padding, perStep), step, true)).join(' ');
    const nextFrame = int === arr.length - 1 ? '' : this.getKeyframe(this.getPosition(history.length, padding, perStep), history[history.length - 1], false);
    const frameEnd = int === arr.length - 1 ? '' : this.getKeyframe('100%', history[history.length - 1], false);

    return `@keyframes robot${int + 1}keys { ${frameStart} ${frames} ${nextFrame} ${frameEnd}} .robot${int + 1} {animation: robot${int + 1}keys ${totalFrames * TIME}s infinite}`;
  }).join('');
  const style = `.box{background:#ccc;position:relative;width:${(box.getWidth() + 1) * MUTIPLIER}px;height:${(box.getHeight() + 1) * MUTIPLIER}px}
                .robot{position:absolute;width:${MUTIPLIER}px;height:${MUTIPLIER}px;text-align:center;display_block;opacity:0.5;}`;
  const robotHtml = robots.map((robot, int) => `<div class="robot robot${int + 1}">\\[^]/</div>`).join('');
  const robotOutput = robots.map((robot, int) => `<p>${robot.getResult()}</p>`).join('');
  const html = `<!DOCTYPE html><html><head><style>${style} ${robotCss}</style></head><body><div class="box">${robotHtml}</div><div>${robotOutput}</div></body></html>`;

  let promisePass;
  let promiseRej;
  const promise = new Promise((pass, rej) => {
    promisePass = pass;
    promiseRej = rej;
  });

  fs.writeFile(fileName || this._fileName, html, 'utf8', (err) => {
    if (err) {
      promiseRej(`File write error ${err}`);
    } else {
      promisePass();
    }
  });

  return promise;
};

HtmlWriter.prototype.getPosition = function (int, pad, step) {
  return `${Math.round(((int + pad) * step) * 100) / 100}%`;
};

HtmlWriter.prototype.getKeyframe = function (position, historyState, active = true) {
  return `${position} {${this.getLocation(historyState)} ${this.getDirection(historyState)} ${this.getOpacity(historyState, active)}}`;
};
HtmlWriter.prototype.getLocation = function (historyState) {
  return `left: ${historyState.x * MUTIPLIER}px; bottom: ${(historyState.y) * MUTIPLIER}px;`;
};
HtmlWriter.prototype.getDirection = function (historyState) {
  let deg = 0;
  switch (historyState.orientation) {
    case Constants.ORIENTATION_NORTH:
      deg = 0;
      break;
    case Constants.ORIENTATION_WEST:
      deg = 270;
      break;
    case Constants.ORIENTATION_SOUTH:
      deg = 180;
      break;
    case Constants.ORIENTATION_EAST:
      deg = 90;
      break;
    default:
      throw new Error(`Unknown initial state for orientation ${historyState.orientation}`);
  }
  return `transform: rotate(${deg}deg);`;
};
HtmlWriter.prototype.getOpacity = function (historyState, active) {
  const minOpacity = active ? '0.3' : '0.1';
  const maxOpacity = active ? '1' : '0.6';
  return `opacity: ${historyState.isLost ? minOpacity : maxOpacity};`;
};

module.exports = HtmlWriter;
