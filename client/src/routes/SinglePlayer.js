import React from 'react';
import GameBoard from '../components/gameboard/GameBoard';
import GameRules from '../components/gameboard/GameRules';

export default function SinglePlayer() {
  return (
    <GameBoard>
      <GameRules />
    </GameBoard>
  )
}