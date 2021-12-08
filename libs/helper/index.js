/**
 * @class Time
 *
 */
class Time {
  constructor() {
    this.time = 0;
    this.timeEnd = 0;
    this.timeStart = 0;
  }

  start() {
    this.timeStart = Date.now();
  }

  end() {
    this.timeEnd = Date.now();
  }

  _time() {
    return this.timeEnd - this.timeStart;
  }

  nowString() {
    return new Date().toTimeString().split(' ')[0];
  }
}

/**
 * @class Text
 */
class Text {
  constructor() {
    this.colors = {
      rst: '\x1b[00m',
      darkGray: '\x1b[37m',
      green: '\x1b[32m',
      cyan: '\x1b[36m',
      red: '\x1b[31m',
    };
  }
  cyan(msg) {
    return `${this.colors.cyan}${msg}${this.colors.rst}`;
  }

  darkGray(msg) {
    return `${this.colors.darkGray}${msg}${this.colors.rst}`;
  }

  green(msg) {
    return `${this.colors.green}${msg}${this.colors.rst}`;
  }

  red(msg) {
    return `${this.colors.red}${msg}${this.colors.rst}`;
  }
}

/**
 *
 * @param {string} text
 * @param {string[]} chars
 * @param {number} delay
 * @returns
 */
function loadingAnimation(text = '', chars = ['⠙', '⠘', '⠰', '⠴', '⠤', '⠦', '⠆', '⠃', '⠋', '⠉'], delay = 200) {
  let x = 0;
  return setInterval(function () {
    const msg = `\r${chars[x++]} ${text}`;
    process.stdout.write(txt.cyan(msg));
    x = x % chars.length;
  }, delay);
}

function clearLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

/**
 * @param {string} namespace
 * @param {string} msg
 */
function debug(namespace, msg) {
  console.log(`${txt.darkGray(`[${time.nowString()}] [${namespace}]`)} ${msg}`);
}

/**
 * @param {string} namespace
 * @param {string} msg
 */
function clearLineAndDebug(namespace, msg) {
  clearLine();
  debug(namespace, msg);
}

const txt = new Text();

const time = new Time();

module.exports = {
  time,
  txt,
  loadingAnimation,
  clearLine,
  clearLineAndDebug,
  debug,
};
