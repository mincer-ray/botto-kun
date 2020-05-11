// banned words list living in its own file
// being cautious of this list potentially getting long

const bannedWords = [
  'a',
  'i',
  'it',
  'all',
  'for',
  'the',
  'me',
  'of',
  'in',
  'im',
  'on',
  'up',
];

const getBannedWords = () => bannedWords;

module.exports = getBannedWords;
