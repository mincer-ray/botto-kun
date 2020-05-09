const Discord = require('discord.js');

// configs
const commands = require('./config/commands.json');

// operations
const doCommand = require('./operations/commands');
const doPhrase = require('./operations/phrases');

// thoughts
const { neutralThought } = require('./brain/thoughts');

const client = new Discord.Client();
const GLOBAL_PREFIX = 'botto-kun';
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

  console.log(`Botto-kun active on ${homeGuild.name}`);
  client.user.setActivity('uwu');
});

client.on('message', async (message) => {
  // prevent infinite bot looping
  if (message.author.bot) return;
  // message must always begin with prefix
  const normalMessage = message.content.toLowerCase();
  if (normalMessage.indexOf(GLOBAL_PREFIX) !== 0) return;

  // message is for botto-kun and not from enemy bot
  // remove nasties from nice words
  console.log('RAW MESSAGE: ', message.content);
  const cleanMessage = normalMessage.replace(/[^a-z0-9 ]/g, '').slice(GLOBAL_PREFIX.length);
  console.log('CLEAN MESSAGE: ', cleanMessage);

  // split input text into arguments and capture the first as potential command
  const args = cleanMessage.trim().split(/ +/g);
  const command = args[0].toLowerCase();

  // test potential command against command list
  const isCommand = Object.keys(commands).includes(command);
  // keep track of whether or not a response was sent
  let actionComplete = false;

  if (isCommand) {
    args.shift();
    actionComplete = await doCommand(command, args, message);
  } else {
    actionComplete = await doPhrase(args, message);
  }

  // nothing resolved so we error poorly
  if (!actionComplete) {
    message.channel.send(neutralThought());
  }
});

client.login(APP_TOKEN);
