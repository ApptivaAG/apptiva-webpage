import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'
import { IconContext } from 'react-icons'

import Navbar from './Navbar'
import fontFace from '../layouts/font-face'
import Footer from './Footer'
import Lightbox from './Lightbox'
import config from '../config'
import Hero from './Hero'

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

if (typeof window !== 'undefined') {
  // make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require, no-undef
  require('smooth-scroll')('a[href*="#"]', {
    // integer or function returning an integer. How far to offset the scrolling anchor location in pixels
    offset: 40,
  })
}

// eslint-disable-next-line no-unused-expressions
const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${fontFace}

  html {
    font-size: 20px;
    font-family: Gentona, sans-serif;
    font-weight: 200;
    color: ${theme.color.text};
  }

  main { display: block; }

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
    color: ${theme.color.primary};
    
    .gatsby-image-wrapper {
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.06);
      }
    }
  }
  
  ul {

    li {
      margin-bottom: 0.5em;
    }
    h3 {
      display: inline;
    }
  }

  pre {
    padding: 1rem;
    background-color: hsla(0, 0%, 0%, 0.02);
    overflow-x: auto;
    border: 1px #eee solid;
  }

  blockquote {
    margin: 1rem;
    background: #F8f8f8;
    padding: 0 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.04) ;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04) ;
    border-right: 1px solid rgba(0, 0, 0, 0.04) ;
    border-left: 3px solid #008FD7;
  }

  svg {
    fill: currentColor;
  }

  iframe {
    border: 0;
  }

`

const Layout = ({ children, showHero = false }) => (
  <ThemeProvider theme={theme}>
    <Lightbox>
      <Helmet title={config.title} />
      {showHero && <Hero />}
      <Navbar location={showHero && 'root'} />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        {children}
      </IconContext.Provider>
      <Footer />
      <GlobalStyle />
    </Lightbox>
  </ThemeProvider>
)

export default Layout
