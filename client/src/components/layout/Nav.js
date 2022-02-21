import styled from '@emotion/styled';
import React from 'react';
import Button from './Button';

const MenuStyled = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;

  li {
    list-style-type: none;
  }

  a {
    margin: 0 1rem;
  }
`

const ButtonStyled = styled(Button)`
  margin: 0 1rem;
`;

export default function Nav() {
  return (
    <nav>
      <MenuStyled>
        <li>
          <ButtonStyled type="nav" to="/single-player">Single Player</ButtonStyled>
        </li>
        <li>
          <ButtonStyled type="nav" to="/multi-player">Multi Player</ButtonStyled>
        </li>
      </MenuStyled>
    </nav>
  )
}