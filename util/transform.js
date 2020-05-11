const _ = require('lodash');

// util
const generateKeywords = require('./keywords');

const PHRASE_PREFIX = 'botto-kun';
const COMMAND_PREFIX = '!';
const ALL_KEYWORDS = generateKeywords();

const cleanMessage = (text, isPhrase, isCommand) => {
  const cleanReg = /[^a-z0-9 ]/g;

  if (isPhrase) {
    return text.replace(cleanReg, '').slice(PHRASE_PREFIX.length);
  }
  if (isCommand) {
    return text.slice(COMMAND_PREFIX.length).replace(cleanReg, '');
  }

  return text.replace(cleanReg, '');
};

const transformMessage = (message) => {
  // botto-kun message format
  const bkmf = {
    rawMessage: message,
  };

  // lower case it and check prefixes
  const lcMessage = message.content.toLowerCase();
  const isPhrase = lcMessage.indexOf(PHRASE_PREFIX) === 0;
  const isCommand = lcMessage.indexOf(COMMAND_PREFIX) === 0;

  bkmf.isPhrase = isPhrase;
  bkmf.isCommand = isCommand;
  bkmf.cleanMessage = cleanMessage(lcMessage, isPhrase, isCommand);

  // chance to go rogue
  bkmf.behave = Math.floor(Math.random() * Math.floor(100)) > 10;

  // grab reference to keywords list
  bkmf.allKeywords = ALL_KEYWORDS;


  // split input text into arguments and capture the first as potential command
  bkmf.args = bkmf.cleanMessage.trim().split(/ +/g);
  if (bkmf.isCommand) { bkmf.command = bkmf.args.shift(); }
  if (bkmf.isPhrase || !bkmf.behave) {
    bkmf.keywords = _.intersection(bkmf.allKeywords, bkmf.args);
  }

  return bkmf;
};

module.exports = transformMessage;
