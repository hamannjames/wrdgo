import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import useFocus from "../../hooks/useFocus";
import Button from "../layout/Button";
import Row from "./Row";

const BoardStyled = styled.section`
  position: relative;
  input {
    text-transform: uppercase;
    margin: 0 1rem;
  }
`;

const GridStyled = styled.div``;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .9);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  & > * {
    margin: 1rem;
  }
`;

export default function GameBoard() {
  const maxSeconds = 20;
  const blankGrid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ];
  const [word, setWord] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [setup, setSetup] = useState(false);
  const [streak, setStreak] = useState(1);
  const [grid, setGrid] = useState(Array.from(blankGrid));
  const [rowNum, setRowNum] = useState(0);
  const [rowCount, setRowCount] = useState(6);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState(false);
  const [fail, setFail] = useState(false);
  const [seconds, setSeconds] = useState(maxSeconds);
  const [inputRef, setInputFocus] = useFocus();

  const blankRow = () => {
    return Array(5).fill({
      value: '',
      state: 'blank'
    })
  }

  const updateGuess = (val, index) => {
    setGuess(val);
    let newGrid = Array.from(grid);
    newGrid[index] = [...Array(5)].map((el, pos) => val.charAt(pos) ?? '');
    setGrid(newGrid);
  }

  const wipeGrid = (val) => {
    setGuess(val);
    let grid = Array.from(blankGrid);
    grid[0][0] = val;
    setGrid(grid);
  }

  const fetchWord = (cb) => {
    setLoaded(false);
    fetch('/word')
      .then(res => res.text())
      .then(data => {
        setWord(data);
        wipeGrid(data.charAt(0));
        setLoaded(true);
        cb && typeof cb === 'function' && cb();
      })
      .catch(e => {
        console.log(e)
      })
  }
  
  useEffect(() => {
    fetchWord();
  },[])

  const handleInput = value => {
    // Todo: fire end game event
    if (value.length > 5 || (rowNum === 0 && value.length < 1)) return;
    updateGuess(value, rowNum);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Todo: show warning to user
    setInputFocus();
    if (guess.length < 5) return;

    if (guess === word) {
      handleCorrect();
      return;
    }

    if (rowNum + 1 === rowCount) {
      handleFail();
      return;
    }

    handleRowChange();
  }

  const handleCorrect = () => {
    setCorrect(true);
    setIsActive(false);
    setStreak(streak + 1);
  }

  const handleFail = () => {
    setFail(true);
    setIsActive(false);
  }

  const handleRowChange = () => {
    setGuess('');
    setRowNum(rowNum + 1);
    setSeconds(maxSeconds);
  }

  const handleReset = () => {
    setRowNum(0);
    setSeconds(maxSeconds);
    setCorrect(false);
    setIsActive(false);
    setStreak(0);
    setFail(false);
    setSetup(false);
    fetchWord();
  }

  const handleNext = () => {
    setRowNum(0);
    setSeconds(maxSeconds);
    setCorrect(false);
    setIsActive(false);
    setFail(false);
    fetchWord(() => setIsActive(true));
    setInputFocus();
  }

  useEffect(() => {
    let countdown;

    if (isActive) {
      countdown = setInterval(() => {
        if (seconds - 1 === 0) {
          handleFail();
          clearInterval(countdown);
          return;
        }

        setSeconds(seconds - 1);
      }, 1000)

      return () => clearInterval(countdown);
    }

    clearInterval(countdown);
  }, [isActive, seconds])

  const handleStart = () => {
    setSetup(true);
    setIsActive(true);
    setInputFocus();
  }

  useEffect(() => {
    if (isActive) {
      setInputFocus();
    }
  })

  return (
    <BoardStyled>
      {!setup && <div><Button type="button" color="accent" onClick={handleStart}>Start Game</Button></div>}
      {correct ? ':)' : (fail ? ':(' : seconds + ' seconds left')}
      {loaded ? <>
      <GridStyled>
        {[...Array(rowCount)].map((el, i) => <Row rowNum={i} word={i < rowNum && word} letters={grid[i]} key={i} />)}
      </GridStyled>
      <form onSubmit={handleSubmit}>
        <input disabled={!setup ? '1' : ''} ref={inputRef} autoFocus maxLength="5" type="text" value={guess} onInput={e => handleInput(e.target.value)} pattern="^[a-zA-Z]+$" />
        <Button type="button" action="submit" color="splash">Guess!</Button>
      </form>
      {correct && <Modal>
          <h3>You Win!</h3>
          <p>Your current streak is {streak}.</p>
          <Button type="button" color="accent" onClick={handleNext}>Next Word</Button>
          <Button type="button" color="accent" onClick={handleReset}>Reset</Button>
        </Modal>
      }
      {fail && <Modal>
        <h3>Whomp Whomp</h3>
        <p>The word was <strong>{word}</strong></p>
        <p>Your streak was {streak}.</p>
        <Button type="button" color="accent" onClick={handleReset}>Reset</Button>
        </Modal>}
      </>
      : 'loading'}
    </BoardStyled>
  )
}