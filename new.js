const { Client, Intents } = require('discord.js');
const handleMessage = require('./src/handlers/handleMessage');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

try {
  // eslint-disable-next-line global-require, import/no-unresolved
  const auth = require('./auth.json');
  APP_TOKEN = auth.token;
} catch (error) {
  APP_TOKEN = process.env.APP_TOKEN;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  handleMessage(message, null, client);
});

client.login(APP_TOKEN);