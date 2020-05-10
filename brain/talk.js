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
];

const respondEmotionally = (text) => {
  const result = sentiment.analyze(text);
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

  const better = _.map(verboseSet, (emojis, word) => {
    const otherWords = _.filter(allWords, (w) => w !== word);

    const filteredSet = _.filter(emojis, (emoji) => {
      return _.intersection(emoji.keywords, otherWords).length;
    });

    return filteredSet;
  });

  const emotionals = _.uniq(_.flatten(better), (i) => i.name);

  if (emotionals.length) {
    const rand = Math.floor(Math.random() * Math.floor(emotionals.length));
    return `${emotionals[rand].entry} :: ${emotionals[rand].name}`;
  }

  if (Object.values(verboseSet).length) {
    const alternate = _.flatten(Object.values(verboseSet));
    const behaviors = _.filter(alternate, i => i.category === 'behavior');
    const emotions = _.filter(alternate, i => i.category === 'emotion');
    let selection = null;

    if (alternate.length) { selection = alternate; }
    if (emotions.length) { selection = emotions; }
    if (behaviors.length) { selection = behaviors; }

    const rand = Math.floor(Math.random() * Math.floor(alternate.length));
    return `${alternate[rand].entry} :: ${alternate[rand].name}`;
  }

  return `${sentimentalThought(result.score)} :: ${result.score}`;
};

module.exports = respondEmotionally;
