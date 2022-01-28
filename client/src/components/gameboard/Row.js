import styled from "@emotion/styled"
import Square from "./Square"

const RowStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export default function Row({ letters, rowNum }) {
  return (
    <RowStyled>
      {letters.map((letter, i) => <Square letter={letter} key={i} />)}
    </RowStyled>
  )
}