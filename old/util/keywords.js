const asciilib = require('asciilib');

const generateKeywords = () => {
  const allWords = Object.values(asciilib.lib).map((o) => o.keywords).flat();
  const uniqueWords = allWords.filter((w, i) => allWords.indexOf(w) === i).sort();
  const singleWords = uniqueWords.filter((w) => w.indexOf(' ') === -1);

  return singleWords;
};

module.exports = generateKeywords;
