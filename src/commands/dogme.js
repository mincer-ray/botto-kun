const axios = require('axios');

const dogme = {
  do: async (args, message) => {
    const breed = args.reverse().join('/');
    try {
      const dog = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
      message.reply(`Pooch acquired ${dog.data.message}`);
    } catch (error) {
      message.reply(`Cannot find dog... ${error.message}.`);
    }
  },
  help: 'add a dog breed to get a pic: dogme pug',
};

module.exports = dogme;
