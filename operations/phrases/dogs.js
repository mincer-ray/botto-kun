const axios = require('axios');

module.exports = dogPhrases = async (args, message) => {
  const supportedDogs = [
    'dachsund', 'pug', 'schipperke', 'shiba', 'whippet'
  ];

  let dogFound = null;
  supportedDogs.forEach((dog) => {
    if (args.includes(dog)) {
      dogFound = dog;
    }
  });

  if (dogFound) {
    const dog = await axios.get(`https://dog.ceo/api/breed/${dogFound}/images/random`);
    message.channel.send(`${dogFound} acquired`, { files: [ dog.data.message ] });
    return true;
  }

  return false;
}
