import styled from "@emotion/styled"

const Letter = styled.div`
  @keyframes PopIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  @keyframes FlipIn {
    0% {
      transform: rotateX(0);
    }
    50% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
  @keyframes FlipOut {
    0% {
      transform: rotateX(-90deg);
    }
    100% {
      transform: rotateX(0);
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  border: 2px solid #000;
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  margin: 5px;
  transition: background-color cubic-bezier(1,-0.67,0,1.53) ${props => props.index * 400 + 500}ms;
  background-color: ${props => props.theme.colors[props.letter.state] ?? 'transparent'};

  &.present, &.absent, &.placed {
    animation-name: FlipIn;
    animation-duration: 500ms;
    animation-timing-function: ease-in;
    animation-delay: ${props => props.index * 200}ms;
    animation-fill-mode: forwards;
  }
`

export default function GameLetter({letter, index, handleAnimationEnd}) {
  return (
    <Letter className={letter.state} onAnimationEnd={handleAnimationEnd} index={index} letter={letter}>
      {letter.value}
    </Letter>
  )
}