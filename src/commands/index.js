const get = require('./get');
const set = require('./set');
const mode = require('./mode');
const salute = require('./salute');
const givepoint = require('./givepoint');
const losepoint = require('./losepoint');
const leaderboard = require('./leaderboard');
const dogme = require('./dogme');
const wordle = require('./wordle');

module.exports = {
  get,
  set,
  mode,
  salute,
  '++': givepoint,
  '--': losepoint,
  leaderboard,
  dogme,
  wordle,
};
