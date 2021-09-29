const leaderboard = {
  do: (args, message, database) => {
    database.ref(`${process.env.BOT_ENV}/points`)
      .once('value')
      .then((snapshot) => {
        const allPoints = snapshot.val();
        const usersByPoints = {};
        const pointValues = new Set();

        Object.keys(allPoints).forEach((user) => {
          const pointTotal = allPoints[user];
          pointValues.add(pointTotal);
          if (usersByPoints[pointTotal]) {
            usersByPoints[pointTotal].push(user);
          } else {
            usersByPoints[pointTotal] = [user];
          }
        });

        const sortedPoints = Array.from(pointValues).sort((a, b) => b - a).slice(0, 10);
        const topList = sortedPoints.map((pointKey) => `${pointKey} ${usersByPoints[pointKey].join(', ')}`);

        message.reply(`${topList.join('\n')}`);
      });
  },
  help: 'top 10 point values and the people who have them',
};

module.exports = leaderboard;
