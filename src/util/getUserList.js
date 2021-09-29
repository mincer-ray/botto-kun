const axios = require('axios');
const cache = require('memory-cache');

const getUserList = () => new Promise((resolve, reject) => {
  axios.get('https://slack.com/api/users.list',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    })
    .then((response) => {
      const niceData = {};
      response.data.members.forEach((user) => { niceData[user.id] = user.profile.name; });
      cache.put('users', niceData);
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = getUserList;
