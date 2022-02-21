import styled from "@emotion/styled"

const BoardStyled = styled.section`
  
`

export default function GameBoard({children}) {
  return (
    <BoardStyled>
      {children}
    </BoardStyled>
  )
}