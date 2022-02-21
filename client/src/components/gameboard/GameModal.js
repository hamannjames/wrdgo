import styled from "@emotion/styled"
import Button from "../layout/Button"

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255,0.9);
  z-index: 100;
`

const Modals = {
  casual: {
    start: ({handleStartRound}) => {
      return (
        <StyledModal>
          <h2>Ready to begin?</h2>
          <Button type="button" onClick={handleStartRound} color="accent">Start!</Button>
        </StyledModal>
      )
    },
    win: () => {
      return <StyledModal>
        <h2>Sweet 😊!</h2>
        <p>Play again tomorrow. Or try regular WRDMO mode for an exciting word game experience with random words. Are you quick enough?</p>
        <Button to="/single-player">Try it!</Button>
      </StyledModal>
    },
    loss: ({word}) => {
      return <StyledModal>
        <h2>Shoot 😔</h2>
        <p>The word was {word}</p>
        <p>Don't fret! Try again tomorrow, or try regular WRDMO mode for an exciting word game experience with random words. Are you quick enough?</p>
        <Button to="/single-player">Try it!</Button>
      </StyledModal>
    }
  },
  single: {
    start: ({handleStartRound}) => {
      const maxRound = localStorage.getItem('single_maxRound');
      return (
        <StyledModal>
          <h2>{maxRound ? `Your best streak is ${maxRound}. Can you beat it?` : 'Get Ready!'}</h2>
          <Button type="button" onClick={handleStartRound} color="accent">Start!</Button>
        </StyledModal>
      )
    },
    win: ({streak, handleNextRound}) => {
      const maxRound = parseInt(localStorage.getItem('single_maxRound'));
      return <StyledModal>
        <h2>Sweet 😊!</h2>
        <p>Your streak is {streak}. {streak === maxRound ? 'A new record!' : `Your record is ${maxRound}`}. Keep it going!</p>
        <Button color="splash" type="button" onClick={handleNextRound}>Next Round</Button>
      </StyledModal>
    },
    loss: ({word, handleReset, streak}) => {
      const maxRound = parseInt(localStorage.getItem('single_maxRound'));
      return <StyledModal>
        <h2>Shoot 😔</h2>
        <p>The word was {word}</p>
        <p>Your streak was {streak}. {streak === maxRound ? 'A new record!' : `Your record is ${maxRound}`}. Care to play again?</p>
        <Button color="splash" type="button" onClick={handleReset}>Reset</Button>
      </StyledModal>
    }
  }
}

export default Modals;