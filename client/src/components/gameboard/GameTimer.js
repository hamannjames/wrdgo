import { useEffect, useState } from "react";

export default function GameTimer({GamePlayEmitter, rules, active}) {
  const [seconds, setSeconds] = useState(rules.rowTime);

  const countDown = () => {
    if (!active) {
      return;
    }

    setSeconds(seconds - 1);
  }

  useEffect(() => {

    if (seconds === 0 && active) {
      GamePlayEmitter.current.emit('time:over');
      return;
    }

    let timer = setTimeout(countDown, 1000);

    if (!active) {
      clearTimeout(timer);
      setSeconds(rules.rowTime)
    }
    
    return () => clearTimeout(timer);
  }, [active, seconds])

  return (
    <h2>{seconds}</h2>
  )
}