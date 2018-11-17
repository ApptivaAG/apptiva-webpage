import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

export const Section = styled.section`
  position: relative;
  padding-top: 2em;
  padding-bottom: 2em;

  ${props =>
    props.dark &&
    css`
      background-color: ${props.theme.color.lightBg};
    `};
`

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  padding-right: 1em;
  padding-left: 1em;
`

export const Centered = styled.div`
  text-align: center;
`
export const Right = styled.div`
  text-align: right;
`

export const Title = styled.h1`
  font-size: 2.8em;

  text-align: center;
  @media (min-width: 381px) {
    font-size: 4em;
  }
`

export const Subtitle = styled.h4`
  font-size: 1.2em;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: -1em;
  margin-bottom: 1em;
  text-align: center;
`

export const sharedButtonStyle = css`
  display: inline-block;
  padding: 0.6em 1.4em .7em;
  border: 0 none;
  border-radius: 0.1em;
  font-weight: 500;
  color: white;
  background-color: ${props => props.theme.color.primary};
  transition: transform 30ms ease-out;
  transform: translate3d(0, 0, 0);
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    transform: translate3d(0, -1px, 0);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 380px){
    width: 100%
    text-align: center;
  }
`
const ButtonStyled = styled.button`
  ${sharedButtonStyle};
`
const AStyled = styled.a`
  ${sharedButtonStyle};
`
const LinkStyled = styled(Link)`
  ${sharedButtonStyle};
`

export const Button = ({ type, href, to, ...props }) => {
  if (type && href) {
    throw new Error('type and href are not possible')
  }
  return type ? (
    <ButtonStyled type={type} {...props} />
  ) : href ? (
    <AStyled href={href} {...props} />
  ) : (
    <LinkStyled to={to} {...props} />
  )
}

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 1.8em;
  width: 1.8em;
  font-size: 1.4em;
  margin-right: 0.6em;
  color: ${props => props.theme.color.bg};
  border-radius: 50%;
  background-color: ${props => props.theme.color.secondary};
`
