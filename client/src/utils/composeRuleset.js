import isAllowed from './isAllowed';

export default function composeRuleset({
  rowTime = 20,
  maxRounds = Infinity,
  maxRows = 5,
  validateGuess = true,
  randomWord = true,
  strictMode = false
}) {

  return {
    getRowTime() {
      return rowTime;
    },
    maxRoundsExceeded(count) {
      return count > maxRounds;
    },
    maxRowsExceeded(count) {
      return count > maxRows;
    },
    validateGuess: validateGuess ? isAllowed() : () => true,
    isRandom() {
      return randomWord;
    },
    isStrictMode() {
      return strictMode
    }
  }
}