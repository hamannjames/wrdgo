import words from '../static/allowedWordsCompiled.json';

export default function isAllowed(word) {

  const getMiddle = (min, max) => Math.floor((min + max) / 2);

  const search = (word, words, min, max) => {
    let middle = getMiddle(min, max);

    if (words[middle] === word) {
      return true;
    }

    if (max - middle <= 0) {
      return false;
    }

    return words[middle] < word ? search(word, words, middle + 1, max) : search(word, words, min, middle - 1);
  }

  return (word) => {
    return search(word, words, 0, words.length - 1);
  }
}