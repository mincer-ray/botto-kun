const axios = require('axios');

const dogPhrases = async (args, message) => {
  const supportedDogs = [
    'dachshund', 'pug', 'samoyed', 'schipperke', 'shiba', 'whippet',
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
      return true;
    }
  } else if (args.includes('dog') || args.includes('dogs') || args.includes('doggo')) {
    const rand = Math.floor(Math.random() * Math.floor(supportedDogs.length));
    const breed = supportedDogs[rand]

    try {
      const dog = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
      message.channel.send('Pooch acquired', { files: [dog.data.message] });
      return true;
    } catch (error) {
      message.channel.send(`Cannot find dog... ${error.message}.`);
      return true;
    }
  }

  return false;
};

module.exports = dogPhrases;
