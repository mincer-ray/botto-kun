const Sentiment = require('sentiment');
const {
  happyThought,
  sadThought,
  neutralThought,
  sentimentalThought,
} = require('./thoughts');

const sentiment = new Sentiment();

const respondEmotionally = (text) => {
  const result = sentiment.analyze(text);

  return `${sentimentalThought(result.score)} :: ${result.score}`;
};

module.exports = respondEmotionally;
