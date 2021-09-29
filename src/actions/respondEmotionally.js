const Sentiment = require('sentiment');

const feelingsMatrix = {
  positive: [
    '٩(◕‿◕｡)۶',
    '\\(★ω★)/',
    '(๑˃ᴗ˂)ﻭ',
    'ヽ(♡‿♡)ノ',
    '(◕‿◕)♡',
  ],
  negative: [
    '(⌒_⌒;)',
    '(￣ヘ￣)',
    '(×﹏×)',
    '｡ﾟ･ (>﹏<) ･ﾟ｡',
    '(╬ Ò﹏Ó)',
  ],
  neutral: [
    'ヽ(ー_ー )ノ',
    '┬┴┬┴┤(･_├┬┴┬┴',
    '┐(￣ヘ￣)┌',
    '(・_・;)',
    'ლ(ಠ_ಠ ლ)',
  ],
};

const randomFeel = (emotion) => {
  const feelArray = feelingsMatrix[emotion];
  return feelArray[Math.floor(Math.random() * feelArray.length)];
};

const respondEmotionally = (message, client) => {
  const sentiment = new Sentiment();
  const botName = `<@!${client.user.id}>`;
  const cleanMessage = message.content.replace(botName, '')
  const result = sentiment.analyze(cleanMessage);
  let emotion = 'neutral';

  if (result.comparative >= 1) {
    emotion = 'positive';
  } else if (result.comparative <= -1) {
    emotion = 'negative';
  }

  message.reply(randomFeel(emotion));
};

module.exports = respondEmotionally;
