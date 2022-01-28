import styled from "@emotion/styled"

const SquareStyled = styled.div`
  border: 2px solid #000;
  margin: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 2px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export default function Square({ letter = '' }) {
  return (
    <SquareStyled>
      {letter}
    </SquareStyled>
  )
}