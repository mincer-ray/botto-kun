const losepoint = {
  do: (args, message, database) => {
    const user = args[0];
    database.ref(`${process.env.BOT_ENV}/points/${user}`)
      .once('value')
      .then((snapshot) => {
        let points = snapshot.val();
        if (!points) { points = 0; }
        const pointTotal = points - 1;
        database.ref(`${process.env.BOT_ENV}/points/${user}`).set(pointTotal);
        message.reply(`${user} -1 for ${pointTotal} total`);
      });
  },
  help: 'minus someone a point for being lame',
};

module.exports = losepoint;
