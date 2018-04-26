import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { fontFace } from './font-face'
import { Container } from './style'
import Footer from '../components/Footer'

const theme = {
  color: {
    primary: '#008fd7',
    secondary: '#81d742',
    text: '#111',
    bg: 'white',
    darkBg: '#f6f6f6',
  },
}

if (typeof window !== 'undefined') {
  // make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require, no-undef
  require('smooth-scroll')('a[href*="#"]', {
    // integer or function returning an integer. How far to offset the scrolling anchor location in pixels
    offset: 156,
  })
}

injectGlobal`
  ${styledNormalize}
  ${fontFace}

html {
  font-size: 20px;
  font-family: Gentona, sans-serif;
  font-weight: 200;
  color: ${theme.color.text};
}

p {
  line-height: 1.3;
}

a {
  text-decoration: none;
  color: ${theme.color.text};
}

h1 {
  font-weight: 800;
}

.full-width {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
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

const TemplateWrapper = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet title="Home | Gatsby + Netlify CMS" />
      {location.pathname === '/' && <Hero />}
      <Navbar />
      <Container>{children()}</Container>
      <Footer />
    </div>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
