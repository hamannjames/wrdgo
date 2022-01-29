import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Button from "../layout/Button";
import Row from "./Row";

const BoardStyled = styled.section`
  position: relative;
`;

const GridStyled = styled.div``;

const Correct = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .9);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  text-transform: uppercase;
`

export default function GameBoard() {
  const blankGrid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ];
  const [word, setWord] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [grid, setGrid] = useState(Array.from(blankGrid));
  const [rowNum, setRowNum] = useState(0);
  const [rowCount, setRowCount] = useState(5);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState(false);

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

  const fetchWord = () => {
    setLoaded(false);
    fetch('/word')
      .then(res => res.text())
      .then(data => {
        setWord(data);
        wipeGrid(data.charAt(0));
        setLoaded(true);
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
    if (value.length > 5) return;
    updateGuess(value, rowNum);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Todo: show warning to user
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
  }

  const handleFail = () => {}

  const handleRowChange = () => {
    setGuess('');
    setRowNum(rowNum + 1);
  }

  const handleReset = () => {
    setRowNum(0);
    setCorrect(false);
    fetchWord();
  }

  return (
    <BoardStyled>
      <h2>{word}</h2>
      {loaded ? <>
      <GridStyled>
        {[...Array(rowCount)].map((el, i) => <Row letters={grid[i]} key={i} />)}
      </GridStyled>
      <form onSubmit={handleSubmit}>
        <input maxLength="5" type="text" value={guess} onInput={e => handleInput(e.target.value)} pattern="^[a-zA-Z]+$" />
        <Button type="button" action="submit" color="splash">Guess!</Button>
      </form>
      {correct && <Correct>
          <h3>You Win!</h3>
          <Button type="button" color="accent" onClick={handleReset}>Reset</Button>
        </Correct>}
      </>
      : 'loading'}
    </BoardStyled>
  )
}