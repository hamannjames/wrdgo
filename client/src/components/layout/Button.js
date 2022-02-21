/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ButtonStyled = styled.div`
  background-color: ${props => props.theme.colors[props.color] ?? 'var(--primary)'};
  transition: all ease .3s;
  transform: rotate(var(--rotate)) skew(calc(var(--skew) / 2));
  border-radius: 2px;
  box-shadow: var(--box-shadow);
  display: inline-block;
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
    
    &.active {
      border-bottom: 2px solid var(--accent);
    }
  }
  button {
    background: none;
    border: inherit;
  }
`

export default function Button({ type = 'link', color = "primary", to = '/#', action = 'button', children, onClick, className, ...props}) {
  let element;

  switch (type) {
    case 'link' :
      element = <Link to={to} onClick={onClick} {...props}>{children}</Link>
      break;
    case 'button' :
      element = <button onClick={onClick} type={action}>{children}</button>
      break;
    case 'nav' :
      element = <NavLink className={({isActive}) => isActive ? 'active' : ''} to={to} onClick={onClick} {...props}>{children}</NavLink>
      break;
    default:
      element = <a href={to} onClick={onClick}>{children}</a>
  }
  return (
    <ButtonStyled color={color} className={className}>
      {element}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  color: 'primary'
}