import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'styled-components'

export const Section = styled.section`
  position: relative;
  padding-top: 1em;
  padding-bottom: 3em;

  ${props =>
    props.dark &&
    css`
      &:before {
        content: ' ';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        right: 50%;
        margin-left: -49.8vw;
        margin-right: -49.8vw;
        background-color: ${props.theme.color.darkBg};
        z-index: -1;
      }
    `};
`

export const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  padding-right: 1em;
  padding-left: 1em;
`

export const FullWidth = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`

export const Centered = styled.div`
  text-align: center;
`

export const Title = styled.h1`
  font-size: 2.8em;

  text-align: center;
  @media (min-width: 381px) {
    font-size: 4em;
  }
`

const shared = css`
  display: inline-block;
  padding: 0.6em 1.4em .7em;
  border-radius: 0.1em;
  font-weight: 500;
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

  @media (max-width: 380px){
    width: 100%
    text-align: center;
  }
`
const ButtonStyled = styled.button`
  ${shared};
`
const AStyled = styled.a`
  ${shared};
`
const LinkStyled = styled(Link)`
  ${shared};
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
