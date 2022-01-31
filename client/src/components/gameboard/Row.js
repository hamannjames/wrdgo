import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Square from "./Square"

const RowStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export default function Row({ letters, word, rowNum }) {
  const [wordMap, setWordMap] = useState(null);
  const [parsed, setParsed] = useState(false);
  
  const parseStatus = (letter, index) => {
    if (wordMap[letter]) {
      wordMap[letter]--;
      if (word.charAt(index) === letter) {
        return 'placed';
      }
      return 'present';
    }

    return 'absent';
  }

  useEffect(() => {
    if (word && !parsed) {
      let newWordMap = {};
      [...word].forEach((letter) => {
        if (!newWordMap[letter]) {
          newWordMap[letter] = 1;
        }
        else {
          newWordMap[letter]++
        }
      })
      let letterArray = letters.map((letter, index) => {
        if (newWordMap[letter]) {
          newWordMap[letter]--;
          if (word.charAt(index) === letter) {
            return 'placed';
          }
          return 'present';
        }
    
        return 'absent';
      })
      setWordMap(letterArray);
      setParsed(true);
    }
  }, [word, parsed])
  return (
    <RowStyled>
      {letters.map((letter, i) => <Square status={
        i === 0 && rowNum === 0 ? 'placed' : (wordMap && wordMap[i])
      } letter={letter} key={i} />)}
    </RowStyled>
  )
}