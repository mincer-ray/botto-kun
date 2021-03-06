const Discord = require('discord.js');

// emoji lib
const emoji = require('node-emoji');

// logger
const logger = require('./util/logger');

// operations
const doCommand = require('./operations/commands');
const doPhrase = require('./operations/phrases');

// brain stuff
const respondEmotionally = require('./brain/talk');

// util
const transformMessage = require('./util/transform');

const client = new Discord.Client();

let APP_TOKEN = null;

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  const auth = require('./auth.json');
  APP_TOKEN = auth.token;
} catch (error) {
  APP_TOKEN = process.env.APP_TOKEN;
}

client.on('ready', () => {
  const homeGuildID = '194112750845165569';
  const homeGuild = client.guilds.cache.get(homeGuildID);

  logger.info(`Botto-kun active on ${homeGuild.name}`);
  client.user.setActivity('uwu');
});

client.on('message', async (message) => {
  // prevent infinite bot looping
  if (message.author.bot) return;

  const action = transformMessage(message);
  let actionComplete = false;

  if (action.isCommand) {
    actionComplete = await doCommand(action.command, action.args, message);
  } else if (action.isPhrase) {
    actionComplete = await doPhrase(action.args, message);
  }

  if (!action.behave || (!actionComplete && action.isPhrase)) {
    message.channel.send(respondEmotionally(action));
  } else {
    // at the end theres a 5% chance to react to the message
    const doReact = Math.floor(Math.random() * Math.floor(100)) < 5;
    if (doReact) {
      const reactEmojis = [];
      action.args.forEach((word) => {
        const match = emoji.find(word);
        if (match) { reactEmojis.push(match.emoji); }
      });
      // reactEmojis.push(emoji.random().emoji);
      reactEmojis.forEach((react) => {
        // noop errors because idgaf
        message.react(react).catch(() => {});
      });
    }
  }
});

client.login(APP_TOKEN);
