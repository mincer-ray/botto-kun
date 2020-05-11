const asciilib = require('asciilib');
const _ = require('lodash');
const { sentimentalThought } = require('./thoughts');
const getBannedWords = require('./banned');

const bannedWords = getBannedWords();

const respondEmotionally = (action) => {
  const useableKeywords = _.difference(action.keywords, bannedWords);
  const search = { topMatch: 0 };

  Object.keys(asciilib.lib).forEach((key) => {
    const matchLevel = _.intersection(asciilib.lib[key].keywords, useableKeywords).length;
    if (!search[matchLevel]) { search[matchLevel] = []; }
    if (search.topMatch < matchLevel) { search.topMatch = matchLevel; }
    search[matchLevel].push(key);
  });

  if (search.topMatch > 0) {
    const matches = search[search.topMatch];
    const rand = Math.floor(Math.random() * Math.floor(matches.length));
    const key = matches[rand];
    return `${asciilib.lib[key].entry}`;
  }

  // fall back to sentiment analysis
  return `${sentimentalThought(action)}`;
};

module.exports = respondEmotionally;
