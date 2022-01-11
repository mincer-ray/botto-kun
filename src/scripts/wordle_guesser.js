const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const removeFromList = (list, char) => list.filter((item) => item !== char);

class WordleGame {
  constructor(dict, secret, maxGuesses = 100) {
    this.dictionary = dict.map((word) => word.toUpperCase());
    this.secret = secret.toUpperCase();
    this.answer = Array.from({ length: 5 }, () => '-');
    this.possibleLetters = Array.from({ length: 5 }, () => ALPHA);
    this.maxGuesses = maxGuesses;
  }

  guessWord() {
    const index = Math.round(Math.random() * (this.dictionary.length - 1));
    return this.dictionary[index];
  }

  checkGuess(guess) {
    guess.split('').forEach((char, i) => {
      if (guess[i] === this.secret[i]) {
        this.answer[i] = char;
        this.possibleLetters[i] = [char];
      } else if (this.secret.includes(char)) {
        const removeLetter = removeFromList(this.possibleLetters[i], char);
        this.possibleLetters[i] = removeLetter;
      } else {
        const newLetters = this.possibleLetters.map((list) => removeFromList(list, char));
        this.possibleLetters = newLetters;
      }
    });
  }

  updateWordList() {
    const newWordsList = this.dictionary.filter((word) => this.isWordValid(word));
    this.dictionary = newWordsList;
  }

  isWordValid(word) {
    return word.split('').every((char, i) => this.possibleLetters[i].includes(char));
  }

  startGuessing() {
    let guessCount = 0;
    let won = false;
    const botMessage = [];

    while (guessCount < this.maxGuesses && !won) {
      botMessage.push(`${this.dictionary.length} words left to choose from`);

      const guess = this.guessWord();
      if (guess) {
        this.checkGuess(guess);
        this.updateWordList();
        guessCount += 1;

        botMessage.push(`I guess ${guess}.`);
        botMessage.push(this.answer.join(' '));
      }
      if (this.answer.join('') === this.secret) {
        botMessage.push(`${guessCount}/${this.maxGuesses}: ${this.secret}`);
        won = true;
      }
      if (!this.dictionary) {
        botMessage.push('The secret is not in my dictionary');
      }
    }

    if (!won) {
      botMessage.push(`I could not solve it after ${guessCount} guesses!`);
    }

    return botMessage;
  }
}

module.exports = WordleGame;
