const moment = require('moment-timezone');
const axios = require('axios');

const { happyThought, sadThought } = require('../brain/thoughts');

module.exports = doPhrase = async (args, message) => {
  console.log(`DO PHRASE: ARGS: ${JSON.stringify(args)}`);

  if ((args.includes('steven') || args.includes('steve')) && args.includes('day')) {
    const steven0Day = 129;
    const stevenDayConverter = {
      0: 'Monday',
      1: 'Wednesday',
      2: 'Friday',
      3: 'Saturday',
      4: 'Saturday',
      5: 'Sunday',
    }

    const day = moment().tz('America/New_York').dayOfYear();
    const stevenDay = day % steven0Day % 6;

    message.channel.send(`Steven day is ${stevenDayConverter[stevenDay]}`);
    return true;
  }

  if (args.includes('good')) {
    message.channel.send(happyThought());
    return true;
  }

  if (args.includes('bad')) {
    message.channel.send(sadThought());
    return true;
  }

  if (args.includes('pug')) {
    const pug = await axios.get('https://dog.ceo/api/breed/pug/images/random');
    message.channel.send('pug acquired', { files: [ pug.data.message ] });
    return true;
  }

  return false;
}