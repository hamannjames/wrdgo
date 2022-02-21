import GameRules from '../components/gameboard/GameRules';

export default function Home() {
  
  return (
    <>
      <h1>Get your daily <span className="wrdmo">WRDMO</span> teaser!</h1>
      <GameRules gameMode="casual" randomWord={false} rowTime={false} />
    </>
  )
}