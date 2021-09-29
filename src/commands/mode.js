const mode = {
  do: (args, message) => {
    message.reply(`running in ${process.env.BOT_ENV} mode`);
  },
  help: 'get the bot mode. this should be PRODUCTION unless its busybotty-dev channel',
};

module.exports = mode;
