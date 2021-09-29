const sendMessage = require('../actions/sendMessage');

const losepoint = {
  do: (args, event, database) => {
    const user = args[0];
    database.ref(`${process.env.BOT_ENV}/points/${user}`)
      .once('value')
      .then((snapshot) => {
        let points = snapshot.val();
        if (!points) { points = 0; }
        const pointTotal = points - 1;
        database.ref(`${process.env.BOT_ENV}/points/${user}`).set(pointTotal);
        sendMessage(event.channel, `${user} -1 for ${pointTotal} total`);
      });
  },
  help: 'minus someone a point for being lame',
};

module.exports = losepoint;
