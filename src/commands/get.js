const get = {
  do: (args, message, database) => {
    database.ref(`${process.env.BOT_ENV}/storage/${args[0]}`)
      .once('value')
      .then((snapshot) => {
        message.reply(`${snapshot.val()}`);
      });
  },
  help: 'gets your data you set with the SET command',
};

module.exports = get;
