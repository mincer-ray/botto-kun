const sendMessage = require('../actions/sendMessage');

const salute = {
  do: (args, event) => {
    sendMessage(event.channel, 'o7');
  },
  help: 'gives a salute',
};

module.exports = salute;
