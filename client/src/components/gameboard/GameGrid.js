import { useEffect, useState } from "react";
import GameRow from "./GameRow";
import useFocus from "../../hooks/useFocus";
import styled from "@emotion/styled";
import Modals from "./GameModal";
import GameNotification from "./GameNotification";

const ContainerStyled = styled.div`
  position: relative;
`

const GridStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  margin: 0 auto;
  padding: .5rem 2rem;
`;

const FormStyled = styled.form`
  margin-top: 1rem;

  input {
    outline-color: var(--secondary);
    text-transform: uppercase;
    border: 2px solid var(--primary);
    font-size: 24px;
    padding: .5rem 1rem;
    border-radius: 2px;
  }
`

export default function GameGrid({
  rowCount,
  rowNum,
  active,
  currGuess,
  handleGuess,
  blankRow,
  win,
  loss,
  GamePlayEmitter,
  word,
  gameMode,
  handleNextRound,
  handleReset,
  handleStartRound,
  round,
  readOnly,
  firstLetter
}) {

  const pattern = /^[a-zA-Z]*$/;
  const [currRow, setCurrRow] = useState(blankRow());
  const [guessStore, setGuessStore] = useState([]);
  const [guess, setGuess] = useState('');
  const [modalState, setModalState] = useState(readOnly ? null : 'start');
  const [input, setInputFocus] = useFocus();
  const [animating, setAnimating] = useState(readOnly ? true : false);
  const [queue, setQueue] = useState([]);
  const [notification, setNotification] = useState('');

  const resetGrid = (modalState) => {
    if (firstLetter) {
      const newRow = blankRow();
      newRow[0] = {value: firstLetter, state: 'placed'}
      setCurrRow(newRow);
      setGuess(firstLetter);
    }
    else {
      setCurrRow(blankRow());
      setGuess('');
    }
    setGuessStore([]);
    setModalState(modalState);
  }

  const handleInput = (input) => {
    if (!input.match(pattern)) {
      return;
    }

    setGuess(input);
    setCurrRow(currRow.map((letter, index) => {
      return {
        value: input.charAt(index),
        state: null
      }
    }))
  }

  const sendGuess = (guess) => {
    const response = handleGuess(guess);

    if (!response) {
      return;
    }

    setAnimating(true);
    setQueue([...queue, response.action])
    setGuessStore([...guessStore, response.row]);
    localStorage.setItem(`${gameMode}_boardState`, JSON.stringify([...guessStore, response.row]));
    setCurrRow(blankRow());
    setGuess('');
    setInputFocus();
  }

  const showWin = () => {
    if (animating) {
      setQueue([...queue, setModalState.bind({}, 'win')])
      return;
    }

    setModalState('win');
  }

  const showLoss = () => {
    if (animating) {
      setQueue([...queue, setModalState.bind({}, 'loss')])
      return;
    }

    setModalState('loss');
  }

  useEffect(() => {
    if(readOnly) {
      console.log('effect');
      setAnimating(true);
      setGuessStore(JSON.parse(localStorage.getItem(`${gameMode}_boardState`)));
      console.log(localStorage.getItem(`${gameMode}_boardState`));
    }
  }, [readOnly]);

  useEffect(() => {
    if (notification) {
      setTimeout(setNotification.bind(false), 1000);
    }
  }, [notification]);

  useEffect(() => {
    if (rowNum > 0) {
      setGuessStore([...guessStore, currGuess]);
      setCurrRow(blankRow());
      setGuess('');
    }
  }, [currGuess])

  useEffect(() => {
    if (animating) {
      return;
    }

    queue.forEach(cb => cb());
    setQueue([]);
  }, [animating])

  useEffect(() => {
    if (active) {
      setInputFocus();
    }
  }, [active])

  useEffect(() => {
    if (win) {
      showWin();
      return;
    }

    if (loss) {
      showLoss();
      return;
    }

    if (!readOnly) {
      resetGrid(round === 0 && 'start');
    }
  }, [win, loss])

  useEffect(() => {
    GamePlayEmitter.current.on('guess:invalid', () => {
      setNotification('Not a word!')
    })
  }, [])

  useEffect(() => {
    if (round === 0 && !readOnly) {
      setModalState('start');
      return;
    }

    setModalState('')
  }, [round])

  useEffect(() => {
    if (firstLetter && rowNum === 0) {
      const newRow = blankRow();
      newRow[0] = {value: firstLetter, state: 'placed'}
      setCurrRow(newRow);
      setGuess(firstLetter);
    }
  }, [firstLetter])

  const handleSubmit = (e) => {
    e.preventDefault();
    sendGuess(guess);
  }

  return (
    <ContainerStyled>
      {notification && <GameNotification message={notification} />}
      <GridStyled>
        {[...Array(rowCount)].map((row, i) => <GameRow 
          key={i} 
          row={guessStore[i] ?? (rowNum === i ? currRow : blankRow())} 
          handleAnimationEnd={setAnimating.bind({}, false)}
          state={rowNum === i ? 'current' : (rowNum > i && 'guessed')}
          />)}
        {modalState && Modals[gameMode][modalState]({word, handleNextRound, handleStartRound, handleReset, streak: loss ? round - 1 : round})}
      </GridStyled>
      <FormStyled onSubmit={handleSubmit}>
        <input ref={input} disabled={!active} autoFocus maxLength="5" type="text" value={guess} onInput={e => handleInput(e.target.value)} />
      </FormStyled>
      {active && <h3>Hit "Enter" to guess</h3>}
    </ContainerStyled>
  )
}