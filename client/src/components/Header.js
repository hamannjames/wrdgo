import React from 'react';
import styled from '@emotion/styled';
import Logo from './Logo';
import Nav from './Nav';
import { Link } from 'react-router-dom';

const HeaderStyled = styled.header`
`

export default function Header() {
  return (
    <HeaderStyled>
      <Link to="/">
        <Logo />
      </Link>
      <Nav />
    </HeaderStyled>
  )
}