const moment = require('moment-timezone');
const axios = require('axios');
const logger = require('../../util/logger');
const dogPhrases = require('./dogs');

const doPhrase = async (args, message) => {
  logger.info(`DO PHRASE: ARGS: ${JSON.stringify(args)}`);

  if ((args.includes('steven') || args.includes('steve')) && args.includes('day')) {
    const steven0Day = 129;
    const stevenDayConverter = {
      0: 'Monday',
      1: 'Wednesday',
      2: 'Friday',
      3: 'Saturday #1',
      4: 'Saturday #2',
      5: 'Sunday',
    };

    const day = moment().tz('America/New_York').dayOfYear();
    const stevenDay = day % steven0Day % 6;

    message.channel.send(`Steven day is ${stevenDayConverter[stevenDay]}`);
    return true;
  }

  if (args.join('') === 'gatherthetroops' || args.join('') === 'assemblethetroops') {
    message.channel.send('@RAMER', { files: ['https://i.imgur.com/4eaWTeX.jpeg'] });
  }

  if (args.includes('cat') || args.includes('cats') || args.includes('catto')) {
    try {
      const cat = await axios.get('http://aws.random.cat/meow');
      message.channel.send({ files: [cat.data.file] });
      return true;
    } catch (error) {
      message.channel.send(`Oh noes, teh kitty finder is acting up... ${error.message}.`);
    }
  }

  const dog = await dogPhrases(args, message);
  if (dog) {
    return true;
  }

  return false;
};

module.exports = doPhrase;
