import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import GamePlay from "./GamePlay";

const SettingsModal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;

  .container {
    position: relative;
  }
`;

export default function GameRules({
  rowTime = 20,
  maxRounds = Infinity,
  maxRows = 6,
  validateGuess = true,
  randomWord = true,
  strictMode = false,
  gameMode = 'single'
} = {}) {
  const [strict, setStrict] = useState(strictMode);
  const [readOnly, setReadOnly] = useState(() => {
    if (gameMode === 'casual' && localStorage.getItem('casual_lastPlayed')) {
      let lastPlayed = (new Date(parseInt(localStorage.getItem('casual_lastPlayed')))).setHours(23, 59, 59, 999);
      if (Date.now() > lastPlayed) {
        localStorage.setItem('casual_readOnly', false);
        return false;
      }
      
      localStorage.setItem('casual_readOnly', true);
      return true;
    }
  })

  return (
    <>
      <GamePlay {...{gameMode, rowTime, maxRounds, maxRows, validateGuess, randomWord, strict, readOnly}} />
      <SettingsModal>
        <div className="container">
          <button strict={strict.toString()} onClick={() => setStrict(!strict)}>Strict Mode</button>
        </div>
      </SettingsModal>
    </>
  )
}