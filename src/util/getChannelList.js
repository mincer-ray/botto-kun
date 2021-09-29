const axios = require('axios');
const cache = require('memory-cache');

const getChannelList = () => new Promise((resolve, reject) => {
  const niceData = {};

  const getChannelPage = (cursor) => axios.get('https://slack.com/api/conversations.list',
    {
      params: {
        limit: 200,
        cursor,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    })
    .then((response) => {
      response.data.channels.forEach((channel) => { niceData[channel.id] = channel.name; });

      if (response.data.response_metadata.next_cursor) {
        getChannelPage(response.data.response_metadata.next_cursor);
      } else {
        cache.put('channels', niceData);
        resolve();
      }
    })
    .catch((error) => {
      reject(error);
    });

  getChannelPage();
});

module.exports = getChannelList;
