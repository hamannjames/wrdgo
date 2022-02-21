/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/react';
import React from 'react';

const LogoStyled = styled.div`
  letter-spacing: 3px;
  font-size: 4rem;
  font-weight: bold;
  background-color: var(--accent);
  display: inline-block;
  margin: .5rem 1rem;
  padding: .2rem;
  transform: rotate(calc(-1 * var(--rotate))) skew(calc(-1 * var(--skew)));
  color: var(--black, #000);
  p {
    padding: 0;
    margin: 0;
    transform: rotate(var(--rotate))
  }
`

export default function Logo() {
  return (
    <LogoStyled>
      <p>WRDMO</p>
    </LogoStyled>
  )
}