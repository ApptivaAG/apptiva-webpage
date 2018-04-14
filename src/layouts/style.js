import React from 'react'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  padding-right: 10px;
  padding-left: 10px;
`

export const FullWidth = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`
const shared = css`
  display: inline-block;
  padding: 0.5em 1em;
  border-radius: 0.1em;
  font-weight: 600;
  color: white;
  background-color: ${props => props.theme.color.primary};
  transition: transform 30ms ease-out;
  transform: translate3d(0, 0, 0);

  &:hover {
    transform: translate3d(0, -1px, 0);
  }

  &:active {
    transform: translateY(1px);
  }
`
const ButtonStyled = styled.button`
  ${shared};
`
const AStyled = styled.a`
  ${shared};
`

export const Button = ({ type, href, ...props }) => {
  if (type && href) {
    throw new Error('type and href are not possible')
  }
  return type ? (
    <ButtonStyled type={type} {...props} />
  ) : (
    <AStyled href={href} {...props} />
  )
}
