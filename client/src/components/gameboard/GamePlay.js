import { useEffect, useRef, useState } from "react";
import fetchWord from "../../utils/fetchWord";
import isAllowed from "../../utils/isAllowed";
import getSolution from "../../utils/getSolution";
import GameGrid from "./GameGrid";
import EventEmitter from 'events';
import GameplayEmitter from "../../utils/gameplayEmitter";
import GameTimer from "./GameTimer";

const validateGuessFunction = isAllowed();

export default function GamePlay({mode = 'casual', strict, readOnly, ...rules}) {
  Object.freeze(rules);
  const getWord = rules.randomWord ? fetchWord : () => new Promise(resolve => {resolve(word)});
  const validateGuess = rules.validateGuess ? validateGuessFunction : () => true;
  const blankRow = () => {
    return Array(5).fill({
      value: '',
      state: null
    })
  }

  const [word, setWord] = useState(rules.randomWord ? '' : getSolution());
  const [rowCount, setRowCount] = useState(6);
  const [rowNum, setRowNum] = useState(0);
  const [round, setRound] = useState(0);
  const [setup, setSetup] = useState(false);
  const [active, setActive] = useState(false);
  const [loss, setLoss] = useState(false);
  const [win, setWin] = useState(false);
  const GamePlayEmitter = useRef(new EventEmitter());

  const init = () => {
    if (readOnly) {
      setWin(localStorage.getItem(`${rules.gameMode}_win`));
      setLoss(localStorage.getItem(`${rules.gameMode}_loss`));
      setRowNum(parseInt(localStorage.getItem(`${rules.gameMode}_rowNum`)));
      setRound(parseInt(localStorage.getItem(`${rules.gameMode}_round`)));
    }

    GamePlayEmitter.current.on('row:next', () => {
      if (win || loss) {
        return;
      }
  
      handleNextRow();
    })

    GamePlayEmitter.current.on('time:over', () => {
      handleLoss();
    })

    if (!word) {
      fetchWord().then(word => {
        setWord(word);
        setSetup(true);
      });
      return;
    }

    setSetup(true);
  }

  const handleStartRound = () => {
    if (!setup) {
      console.log('setting up');
      return;
    }

    setRound(round + 1);
    setActive(true);
  }

  const handleNextRound = (round) => {
    fetchWord().then(word => {
      setWord(word);
      setRowNum(0);
      setRowCount(6);
      setRound(round + 1);
      setWin(false);
      setLoss(false);
      handleStartRound();
    });
  }

  const handleReset = () => {
    setSetup(false);

    fetchWord().then(word => {
      setWord(word);
      setRowNum(0);
      setRowCount(6);
      setRound(0);
      setWin(false);
      setLoss(false);
      setSetup(true);
    });
  }

  const handleAddRow = () => {
    if (rowCount === rules.maxRows) {
      return;
    }

    setRowCount(rowCount + 1);
  }

  const handleNextRow = () => {
    if (rowNum + 1 >= rules.maxRows) {
      return;
    }

    if (rowNum + 1 > rowCount) {
      handleAddRow();
    }

    setRowNum(rowNum + 1);
    setActive(true);
  }

  const handleInvalidGuess = () => {
    GamePlayEmitter.current.emit('guess:invalid');
  }

  const compareGuess = (guess) => {
    const wordMap = [...word].reduce((map, letter) => {
      if (!map[letter]) {
        map[letter] = 0;
      }
      map[letter]++

      return map;
    }, {})

    return [...guess].map((letter, index) => {
      if (!wordMap[letter]) {
        return {
          value: letter,
          state: 'absent'
        };
      }

      wordMap[letter]--;

      if (word.charAt(index) === letter) {
        return {
          value: letter,
          state: 'placed'
        };
      }

      return {
        value: letter,
        state: 'present'
      };
    })
  }

  const handleGuess = (guess) => {
    if (guess.length < 5) {
      return;
    }

    if (rules.validateGuess && !validateGuess(guess)) {
      handleInvalidGuess();
      return;
    }

    let cb;

    if (guess === word) {
      cb = handleWin;
    }
    else if (rowNum + 1 >= rules.maxRows) {
      cb = handleLoss;
    }
    else {
      cb = handleNextRow;
    }

    setActive(false);
    return {action: cb, row: compareGuess(guess)}
  }

  const handleWin = () => {
    setActive(false);
    setWin(true);
    setStats();
    localStorage.setItem(`${rules.gameMode}_win`, true);
    localStorage.setItem(`${rules.gameMode}_loss`, false);
    GamePlayEmitter.current.emit('win');
  }

  const handleLoss = () => {
    setActive(false);
    setLoss(true);
    setStats();
    localStorage.setItem(`${rules.gameMode}_loss`, true);
    localStorage.setItem(`${rules.gameMode}_win`, false);
    GamePlayEmitter.current.emit('loss');
  }

  const setStats = () => {
    localStorage.setItem(`${rules.gameMode}_lastPlayed`, Date.now());
    localStorage.setItem(`${rules.gameMode}_rowNum`, rowNum);
    localStorage.setItem(`${rules.gameMode}_round`, round);

    const maxRound = localStorage.getItem(`${rules.gameMode}_maxRound`);

    if (round > maxRound) {
      localStorage.setItem(`${rules.gameMode}_maxRound`, round);
    }
  }

  useEffect(init, []);

  return (
    <>
      {rules.rowTime && <GameTimer {...{rules, GamePlayEmitter, active, setup}} />}
      <GameGrid 
        {...{rowCount, rowNum, active, handleGuess, handleReset, handleStartRound, blankRow, GamePlayEmitter, win, loss, setup, round, readOnly}} 
        word={(win || loss) && word} 
        gameMode={rules.gameMode}
        handleNextRound={handleNextRound.bind({}, round)}
        firstLetter={rules.gameMode !== 'casual' && word.charAt(0)}
      />
    </>
  )
}