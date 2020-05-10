const Sentiment = require('sentiment');
const asciilib = require('asciilib');
const _ = require('lodash');
const {
  sentimentalThought,
} = require('./thoughts');

const sentiment = new Sentiment();

const bannedWords = [
  'a',
  'i',
  'it',
  'all',
  'for',
  'the',
  'me',
  'of',
  'in',
  'im',
  'on',
  'up',
];

const respondEmotionally = (action) => {
  const text = action.cleanMessage;
  const result = sentiment.analyze(text);

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
    console.log(matches);
    const rand = Math.floor(Math.random() * Math.floor(matches.length));
    const key = matches[rand];
    return `${asciilib.lib[key].entry}`;
  }

  const filter = (word) => {
    return _.filter(asciilib.lib, (o) => o.keywords.includes(word));
  };

  const verboseSet = {};
  const allWords = _.difference(_.uniq(text.split(' ')), bannedWords);

  allWords.forEach((word) => {
    const emojiSet = filter(word);
    if (emojiSet.length) {
      verboseSet[word] = emojiSet;
    }
  });

  return `${sentimentalThought(result.score)}`;
};

module.exports = respondEmotionally;
