import styled from "@emotion/styled";

const NotificationStyled = styled.div`
  @keyframes Shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  div {
    font-size: 18px;
    padding: .5rem 1rem;
    background-color: var(--accent);
    animation-name: Shake;
    animation-duration: .5s;
    animation-iteration-count: infinite;
  }
`

export default function GameNotification({message}) {
  return (
    <NotificationStyled>
      <div>
        {message}
      </div>
    </NotificationStyled>
  )
}