const Sentiment = require('sentiment');
const kaomoji = require('../config/jp.json');

const sentiment = new Sentiment();

const thoughtMatrix = {
  worst: ['Angry', 'Crazy', 'Dead', 'Evil', 'Giving Up'],
  bad: ['Apologizing', 'Hiding', 'Sad', 'Hurt'],
  neutral: ['Clouds', 'Confused', 'Meh'],
  good: ['Happy', 'Laughing', 'Hugging'],
  best: ['Dancing', 'Kissing', 'Excited', 'Love'],
};

const emojiMatrix = (feel) => {
  const randKey = Math.floor(Math.random() * Math.floor(thoughtMatrix[feel].length));
  const kaomojiKey = thoughtMatrix[feel][randKey];
  const kaomojiObject = kaomoji.categories.find((obj) => obj.name === kaomojiKey);
  const randEmojiKey = Math.floor(Math.random() * Math.floor(kaomojiObject.entries.length));

  return kaomojiObject.entries[randEmojiKey].emoticon;
};

const sentimentalThought = (action) => {
  const { score } = sentiment.analyze(action.cleanMessage);

  if (score <= -2) {
    return emojiMatrix('worst');
  }
  if (score < 0) {
    return emojiMatrix('bad');
  }
  if (score < 2) {
    return emojiMatrix('good');
  }
  if (score >= 2) {
    return emojiMatrix('best');
  }

  return emojiMatrix('neutral');
};

const happyThought = () => sentimentalThought(1);
const sadThought = () => sentimentalThought(-1);
const neutralThought = () => sentimentalThought(0);

module.exports = {
  happyThought,
  sadThought,
  neutralThought,
  sentimentalThought,
};
