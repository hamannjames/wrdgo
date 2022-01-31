import styled from "@emotion/styled"
import { useEffect, useState } from "react";

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
  background-color: ${props => props.theme.colors[props.status] ?? 'transparent'};
`;

export default function Square({ letter = '', status = '' }) {
  const [thisStatus, setStatus] = useState('');

  useEffect(() => {
    if (!thisStatus && status) {
      setStatus(status);
    }
  }, [status, thisStatus])

  return (
    <SquareStyled status={thisStatus}>
      {letter}
    </SquareStyled>
  )
}