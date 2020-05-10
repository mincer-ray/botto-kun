const _ = require('lodash');

// util
const generateKeywords = require('./keywords');

const PHRASE_PREFIX = 'botto-kun';
const COMMAND_PREFIX = '!';
const ALL_KEYWORDS = generateKeywords();


const transformMessage = (message) => {
  // botto-kun message format
  const bkmf = {
    rawMessage: message,
  };

  // lower case it and check prefixes
  const lcMessage = message.content.toLowerCase();
  bkmf.isPhrase = lcMessage.indexOf(PHRASE_PREFIX) === 0;
  bkmf.isCommand = lcMessage.indexOf(COMMAND_PREFIX) === 0;

  let cleanMessage = null;
  if (bkmf.isPhrase) { cleanMessage = lcMessage.replace(/[^a-z0-9 ]/g, '').slice(PHRASE_PREFIX.length); }
  if (bkmf.isCommand) { cleanMessage = lcMessage.slice(COMMAND_PREFIX.length).replace(/[^a-z0-9 ]/g, ''); }
  if (!cleanMessage) { cleanMessage = lcMessage.replace(/[^a-z0-9 ]/g, ''); }
  bkmf.cleanMessage = cleanMessage;

  // chance to go rogue
  bkmf.behave = Math.floor(Math.random() * Math.floor(100)) > 10;

  // grab reference to keywords list
  bkmf.allKeywords = ALL_KEYWORDS;


  // split input text into arguments and capture the first as potential command
  bkmf.args = cleanMessage.trim().split(/ +/g);
  if (bkmf.isCommand) { bkmf.command = bkmf.args.shift(); }
  if (bkmf.isPhrase || !bkmf.behave) {
    bkmf.keywords = _.intersection(bkmf.allKeywords, bkmf.args);
  }

  return bkmf;
};

module.exports = transformMessage;
