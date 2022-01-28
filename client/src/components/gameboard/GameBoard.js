import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Button from "../layout/Button";
import Row from "./Row";

const BoardStyled = styled.section``

const GridStyled = styled.div``;

export default function GameBoard() {
  const [grid, updateGrid] = useState([
    ['w', 'r', 'd', 'g', 'o'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [rowNum, updateRowNum] = useState(0);
  const [rowCount, updateRowCount] = useState(5);
  const [guess, updateGuess] = useState('');

  const handleInput = value => {
    // Todo: fire end game event
    if (value.length > 5) return;
    updateGuess(value);
    let newGrid = grid;
    newGrid[rowNum] = [...Array(5)].map((el, pos) => value.charAt(pos) ?? '');
    updateGrid(newGrid);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Todo: show warning to user
    if (guess.length < 5) return;
    updateRowNum(rowNum + 1);
    updateGuess('');
  }

  return (
    <BoardStyled>
      <GridStyled>
        {[...Array(rowCount)].map((el, i) => <Row rowNum={i} letters={grid[i]} key={i}/>)}
      </GridStyled>
      <form onSubmit={handleSubmit}>
        <input maxLength="5" type="text" value={guess} onInput={e => handleInput(e.target.value)} pattern="^[a-zA-Z]+$" />
        <Button type="button" action="submit" color="splash">Guess!</Button>
      </form>
    </BoardStyled>
  )
}