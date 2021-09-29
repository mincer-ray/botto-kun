const fs = require('fs');

// Do secrets for dev mode
if (process.env.BOT_ENV === 'DEVELOPMENT') {
  // eslint-disable-next-line
  const auth = require('./auth.json');
  process.env.DB_URL = auth.db_url;
  process.env.GOOGLE = JSON.stringify(auth.google);
  process.env.APP_TOKEN = auth.token;
}

// write json file for piiiicky google
fs.writeFileSync('./service-account.json', process.env.GOOGLE);
process.env.GOOGLE_APPLICATION_CREDENTIALS = './service-account.json';

// require junk
const { Client, Intents } = require('discord.js');
const firebaseAdmin = require('firebase-admin');
const handleMessage = require('./src/handlers/handleMessage');
const logger = require('./src/util/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// const port = process.env.PORT || 3000;

// Init firebase service account
const firebaseConfig = {
  databaseURL: process.env.DB_URL,
};
firebaseAdmin.initializeApp(firebaseConfig);

// DB test code
const database = firebaseAdmin.database();
database.ref(`${process.env.BOT_ENV}/ping`).set(new Date(Date.now()).toString());

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  // loop protection
  if (message.author.id === client.user.id) return;
  handleMessage(message, database, client);
});

client.login(process.env.APP_TOKEN);
