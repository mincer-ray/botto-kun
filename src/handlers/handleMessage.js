// const cache = require('memory-cache');
const doCommand = require('../actions/doCommand');
const respondEmotionally = require('../actions/respondEmotionally');
const parseCommand = require('../util/parseCommand');

const handleMessage = (message, database, client) => {
  const botMention = message.mentions.has(client.user);

  if (botMention) {
    // const isDevChannel = cache.get('channels')[event.channel] === 'busybotty-dev';
    // if (process.env.BOT_ENV === 'PRODUCTION' && isDevChannel) {
    //   return;
    // }
    // if (process.env.BOT_ENV === 'DEVELOPMENT' && !isDevChannel) {
    //   return;
    // }

    console.log('message heard: ', message);

    const command = parseCommand(message, client);
    if (command) {
      doCommand(command, message, database);
      // message.reply(`${command.type}: ${command.args}`);

    } else {
      respondEmotionally(message, client);
    }
  }
};

module.exports = handleMessage;
