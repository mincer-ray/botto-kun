const moment = require('moment-timezone');
const { happyThought, sadThought } = require('../../brain/thoughts');
const dogPhrases = require('./dogs');

const doPhrase = async (args, message) => {
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
    };

    const day = moment().tz('America/New_York').dayOfYear();
    const stevenDay = day % steven0Day % 6;

    message.channel.send(`Steven day is ${stevenDayConverter[stevenDay]}`);
    return true;
  }

  if (args.join('') === 'gatherthetroops' || args.join('') === 'assemblethetroops') {
    message.channel.send('@RAMER', { files: ['https://i.imgur.com/4eaWTeX.jpeg'] });
  }

  if (args.includes('good')) {
    message.channel.send(happyThought());
    return true;
  }

  if (args.includes('bad')) {
    message.channel.send(sadThought());
    return true;
  }

  const dog = await dogPhrases(args, message);
  if (dog) {
    return true;
  }

  return false;
};

module.exports = doPhrase;