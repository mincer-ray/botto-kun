const axios = require('axios');

const dogPhrases = async (args, message) => {
  const supportedDogs = [
    'dachsund', 'pug', 'samoyed', 'schipperke', 'shiba', 'whippet',
  ];

  let dogFound = null;
  supportedDogs.forEach((dog) => {
    if (args.includes(dog)) {
      dogFound = dog;
    }
  });

  if (dogFound) {
    try {
      const dog = await axios.get(`https://dog.ceo/api/breed/${dogFound}/images/random`);
      message.channel.send(`${dogFound} acquired`, { files: [dog.data.message] });
      return true;
    } catch (error) {
      message.channel.send(`This dog can't be supplied currently! ${error.message}.`);
    }
  }

  return false;
};

module.exports = dogPhrases;
