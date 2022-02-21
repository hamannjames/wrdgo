import styled from "@emotion/styled"
import GameLetter from "./GameLetter"

const Row = styled.div`
  display: flex;
  position: relative;
  z-index: 1;

  &.current, &.guessed {
    &::before {
      background-color: var(--primary);
    }
  }

  &::before {
    content: "";
    transition: background-color ease .3s;
    z-index: -1;
    position: absolute;
    transform: translate(-50%, -50%) rotate(calc(-.2 * var(--rotate))) skew(calc(-.2 * var(--skew)));
    top: 50%;
    left: 50%;
    width: 102%;
    height: 102%;
  }
`

export default function GameRow({row, handleAnimationEnd, state}) {
  return (
    <Row className={state}>
      {row.map((letter, i) => <GameLetter key={i} index={i} letter={letter} handleAnimationEnd={i === 4 ? handleAnimationEnd : null} />)}
    </Row>
  )
}