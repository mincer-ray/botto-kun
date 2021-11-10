// const cache = require('memory-cache');
const logger = require('../util/logger');
const doCommand = require('../actions/doCommand');
const respondEmotionally = require('../actions/respondEmotionally');
const parseCommand = require('../util/parseCommand');

const handleMessage = (message, database, client) => {
  const botMention = message.mentions.has(client.user);

  if (botMention) {
    const isDevChannel = message.channel.name === 'botto-kun-prison';

    if (process.env.BOT_ENV === 'PRODUCTION' && isDevChannel) {
      return;
    }
    if (process.env.BOT_ENV === 'DEVELOPMENT' && !isDevChannel) {
      return;
    }

    logger.info(`mention in ${process.env.BOT_ENV} heard: ${message.content}`);

    const command = parseCommand(message, client);
    if (command) {
      doCommand(command, message, database);
    } else {
      respondEmotionally(message, client);
    }
  }

  const actAFool = Math.floor(Math.random() * Math.floor(100)) < 1;

  if (actAFool) {
    respondEmotionally(message, client);
  }
};

module.exports = handleMessage;
