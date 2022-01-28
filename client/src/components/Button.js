/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonStyled = styled.div`
  background-color: ${props => props.theme.colors[props.color] ?? 'var(--primary)'};
  transition: all ease .3s;
  transform: rotate(var(--rotate)) skew(calc(var(--skew) / 2));
  border-radius: 2px;
  box-shadow: var(--box-shadow);
  &:hover {
    background-color: ${props => props.theme.colors[props.color + 'Light'] ?? 'var(--primary-light)'};
    transform: rotate(calc(-1 * var(--rotate))) skew(calc(var(--skew) / 2));
  }
  a, button {
    transform: rotate(calc(-1 * var(--rotate))) skew(calc(-1 * var(--skew) / 2));
    padding: 1rem 1.5rem;
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
`

export default function Button({ type = 'link', color = "primary", to = '/#', children, onClick, className }) {
  return (
    <ButtonStyled color={color} className={className}>
      {type === 'link'
        ? <Link to={to} onClick={onClick}>{children}</Link>
        : (type === 'button'
          ? <button onClick={onClick}>{children}</button>
          : <a href={to} onClick={onClick}>{children}</a>
        )
      }
    </ButtonStyled>
  )
}

Button.defaultProps = {
  color: 'primary'
}