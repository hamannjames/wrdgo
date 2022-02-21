import getSolution from './getSolution';
import fetchWord from './fetchWord';
import GameplayEmitter from './gameplayEmitter';

export default function composeGameplay({
  rules,
  rows = 5,
  rowNum = 0,
  round = 1,
  mode = 'casual',
  setup = false,
}) {
  let solution;
  let currentWord;
  let active = false;
  let over = false;

  if (!rules.isRandom()) {
    solution = getSolution();
  }

  if (rules.maxRowsExceeded(rows)) {
    throw new Error('Gameplay instantiated with too many rows');
  }

  if (rules.maxRoundsExceeded(round)) {
    throw new Error('Gameplay instantiated above round limit');
  }

  const getWord = rules.isRandom() ? fetchWord : () => new Promise((resolve) => {resolve(solution)});
  const countDown = (seconds) => {
    if (!active) {
      GameplayEmitter.emit('time:adjust', rules.getRowTime());
      return;
    }

    if (seconds === 0) {
      GameplayEmitter.emit('time:over');
      return;
    }

    GameplayEmitter.emit('time:adjust', seconds - 1);
    setTimeout(() => {
      countDown(seconds - 1)
    }, 1000);
  }

  return {
    getRows() {
      return rows;
    },
    getRowNum() {
      return rowNum;
    },
    handleGuess(word) {
      if (word === currentWord) {
        GameplayEmitter.emit('guess:correct');
        this.handleRoundOver();
      }

      if (!rules.validateGuess(word)) {
        GameplayEmitter.emit('guess:invalid')
        return;
      }

      GameplayEmitter.emit('guess:valid');
      this.handleNextRow();
    },
    async setup() {
      if (setup) {
        throw new Error('Gameplay is already setup');
      }

      await getWord()
        .then(word => { currentWord = word })
        .then(() => {setup = true});
    },
    start() {
      active = true;
      countDown(rules.getRowTime());
    }
  }
}