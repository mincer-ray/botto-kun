const WordleGame = require('../scripts/wordle_guesser');
const wordlist = require('../scripts/wordlist.json');

const fullUniqueList = Array.from(new Set([...wordlist.solutions, ...wordlist.valid]));

const wordle = {
  do: (args, message) => {
    const userWord = args[0];
    const randomWord = wordlist.solutions[Math.floor(Math.random() * wordlist.solutions.length)];
    const wg = new WordleGame(fullUniqueList, userWord || randomWord, 6);
    const botMessage = wg.startGuessing();
    message.reply(botMessage.join('\n'));
  },
  help: 'play word',
};

module.exports = wordle;
