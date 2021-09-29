const axios = require('axios');
const cache = require('memory-cache');

const testAuth = () => new Promise((resolve, reject) => {
  axios.get('https://slack.com/api/auth.test',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    })
    .then((response) => {
      cache.put('botname', response.data.user_id);
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = testAuth;
