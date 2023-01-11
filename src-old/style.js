/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled, { css, createGlobalStyle } from 'styled-components'

import newTab from './img/new-tab.svg'

export const Section = styled.section`
  position: relative;
  padding-top: 2em;
  padding-bottom: 4em;

  ${(props) =>
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

export const MainTitle = styled.h1`
  font-size: 2em;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 4em;
  }
`

export const Title = styled.h2`
  font-size: 2.8em;

  @media (min-width: 640px) {
    font-size: 4em;
  }
`
export const DeemphasizedTitle = styled.h2`
  font-size: 1.7em;
  color: #cbcbcb;
  text-align: center;
  @media (min-width: 640px) {
    font-size: 1.4em;
  }
`

export const Subtitle = styled.h4`
  font-size: 1.2em;
  font-weight: 300;
  text-transform: uppercase;
  margin-top: -1em;
  margin-bottom: 1em;
`

export const sharedButtonStyle = css`
  display: inline-block;
  padding: 0.6em 1.4em 0.7em;
  border: 0 none;
  border-radius: 0.1em;
  font-weight: 500;
  color: white;
  background-color: ${(props) => props.theme.color.primary};
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

  @media (max-width: 380px) {
    width: 100%;
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

export const Buttonlist = styled(Right)`
  a {
    margin-top: 1em;
  }
  @media (min-width: 381px) {
    a {
      margin-left: 1em;
    }
  }
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 2em;
  width: 2em;
  font-size: 1.5em;
  margin-right: 0.6em;
  color: ${(props) => props.theme.color.bg};
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.secondary};
`

export const ImgStyled = styled(GatsbyImage)`
  max-width: 340px;
  transition: transform 0.3s;
`

export const Row = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex: 1 1 12rem;
  h3 {
    margin: 0;
  }
`

export const Card = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.color.lightBg};
  border-radius: 0.2em;

  h3,
  p {
    margin-top: 0.1em;
    margin-bottom: 0.2em;
  }
  p {
    margin-bottom: 0.5em;
    font-size: 0.8em;
    font-weight: 200;
  }
  svg {
    transition: transform 0.3s;
  }

  &:hover {
    color: ${(props) => props.theme.color.bg};
    background-color: ${(props) => props.theme.color.primary};

    ${ImgStyled}, svg {
      transform: scale(1.06);
      color: black;
    }
  }
`

export const theme = {
  color: {
    primary: '#008fd7',
    secondary: '#81d742',
    orange: '#ff7d00',
    text: '#111',
    bg: 'white',
    lightBg: '#f6f6f6',
    darkGray: '#3d525c',
  },
}

export const GlobalStyle = createGlobalStyle`
  :root {
    box-sizing: border-box;
  }

  *:not(img):not(video):not(svg),
  *:after,
  *:before {
    box-sizing: inherit;
  }

  html {
    font-size: 20px;
    font-family: Gentona, sans-serif;
    font-weight: 200;
    color: ${theme.color.text};
  }

  main { 
    display: block; 
  }

  h1 {
    font-weight: 800;
  }
  h1, h2 {
    hyphens: auto;
  }

  p {
    line-height: 1.3;
  }

  a {
    text-decoration: none;
    ${'' /* higher contrast for accessability */}
    color: hsla(200, 100%, 35%, 1); 
    font-weight: 600;
    
    .gatsby-image-wrapper {
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.06);
      }
    }

    &[target="_blank"]:not(.gatsby-resp-image-link):after {
      content: url(${newTab});
      vertical-align: middle;
      padding: 0.1em 0.2em;
      transform: scale(0.8)
    }
  }
  
  ol, ul {

    li {
      margin-bottom: 0.5em;
    }
    h3 {
      display: inline;
    }
    h3 + p {
      margin-top: 0.2em;
    }
  }

  strong, b {
    font-weight: bold;
  }

  pre {
    padding: 1rem;
    background-color: hsla(0, 0%, 0%, 0.02);
    overflow-x: auto;
    border: 1px #eee solid;
  }

  blockquote {
    margin: 1rem 0;
    background: #F8f8f8;
    padding: 0 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.04) ;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04) ;
    border-right: 1px solid rgba(0, 0, 0, 0.04) ;
    border-left: 3px solid #008FD7;

    @media (min-width: 768px) {
      margin: 1rem 2rem;
      
    }
  }

  svg {
    fill: currentColor;
  }

  iframe {
    border: 0;
  }

  figure {
    margin: 0;
  }

  figcaption {
    font-size: 0.8em;
    margin-top: 0.5em;
    color: gray;
    text-align: center;
  }


  .gatsby-image-wrapper [data-placeholder-image] {
    filter: blur(26px);
    transform: scale(1.04);
  }
`
