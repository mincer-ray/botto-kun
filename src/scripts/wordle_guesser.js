const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const removeFromList = (list, char) => list.filter((item) => item !== char);

class WordleGame {
  constructor(dict, secret, maxGuesses = 100) {
    this.answer = Array.from({ length: 5 }, () => '-');
    this.confirmedLettersInSecret = [];
    this.dictionary = dict.map((word) => word.toUpperCase());
    this.maxGuesses = maxGuesses;
    this.possibleLettersAtPosition = Array.from({ length: 5 }, () => ALPHA);
    this.secret = secret.toUpperCase();
  }

  guessWord() {
    const index = Math.round(Math.random() * (this.dictionary.length - 1));
    return this.dictionary[index];
  }

  checkGuess(guess) {
    guess.split('').forEach((char, i) => {
      if (guess[i] === this.secret[i]) {
        this.answer[i] = char;
        this.possibleLettersAtPosition[i] = [char];
        this.confirmedLettersInSecret.push(char);
      } else if (this.secret.includes(char)) {
        const removeLetterAtPosition = removeFromList(this.possibleLettersAtPosition[i], char);
        this.possibleLettersAtPosition[i] = removeLetterAtPosition;
        this.confirmedLettersInSecret.push(char);
      } else {
        const newLetters = this.possibleLettersAtPosition.map((list) => removeFromList(list, char));
        this.possibleLettersAtPosition = newLetters;
      }
    });
  }

  updateWordList() {
    const newWordsList = this.dictionary.filter((word) => this.isWordValid(word));
    this.dictionary = newWordsList;
  }

  isWordValid(word) {
    const hasConfirmedLetters = this.confirmedLettersInSecret.every((char) => word.includes(char));

    const isValidByPosition = word.split('')
      .every((char, i) => this.possibleLettersAtPosition[i].includes(char));

    return hasConfirmedLetters && isValidByPosition;
  }

  startGuessing() {
    let guessCount = 0;
    let won = false;
    const botMessage = [];

    if (!this.dictionary || !this.dictionary.includes(this.secret)) {
      botMessage.push('The secret is not in my dictionary');
      return botMessage;
    }

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
    }

    if (!won) {
      botMessage.push(`I could not solve it after ${guessCount} guesses!`);
    }

    return botMessage;
  }
}

module.exports = WordleGame;
