const kaomoji = require('../config/jp.json');

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

const sentimentalThought = (score) => {
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

const randomThought = (thoughts) => {
  const rand = Math.floor(Math.random() * Math.floor(thoughts.length));
  return thoughts[rand];
};

const happyThought = () => {
  const thoughts = [
    '( ᐛ )و',
    '乂❤‿❤乂',
    '໒( ♥ ◡ ♥ )७',
    'uwuwuwu <3 ty',
  ];

  return randomThought(thoughts);
};

const sadThought = () => {
  const thoughts = [
    'sniff T_T',
    '‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·˚',
    'ಠ╭╮ಠ',
    '(๑◕︵◕๑)',
  ];

  return randomThought(thoughts);
};

const neutralThought = () => {
  const thoughts = [
    '(・_・ヾ',
    'Σ(￣ロ￣lll)',
    'ε-(‘ﾍ´○)┓',
    '(￣ω￣;)',
  ];

  return randomThought(thoughts);
};

module.exports = {
  happyThought,
  sadThought,
  neutralThought,
  sentimentalThought,
};
