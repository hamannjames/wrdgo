import styled from "@emotion/styled"
import { useState } from "react"
import Button from "../layout/Button";
import Row from "./Row";

const BoardStyled = styled.section``

const GridStyled = styled.div``;

export default function GameBoard() {
  const [rows, updateRows] = useState([
    ['w', 'r', 'd', 'g', 'o'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [rowNum, updateRowNum] = useState(0);
  const [rowCount, updateRowCount] = useState(5);

  const updateRow = value => {
    let newRows = [...rows];
    newRows[rowNum] = [...Array(rowCount)].map((el, pos) => value.charAt(pos) ?? '');
    updateRows(newRows);
  }

  return (
    <BoardStyled>
      <GridStyled>
        {[...Array(rowCount)].map((el, i) => <Row rowNum={i} letters={rows[i]} key={i}/>)}
      </GridStyled>
      <input onInput={e => updateRow(e.target.value)} maxLength="5" type="text" />
      <Button type="button" onClick={() => updateRowNum(rowNum + 1)} />
    </BoardStyled>
  )
}