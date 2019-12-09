import React from 'react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import Navbar from './Navbar'
import Footer from './Footer'
import Lightbox from './Lightbox'
import config from '../config'
import Hero from './Hero'
import { GlobalStyle, theme } from '../style'

if (typeof window !== 'undefined') {
  // make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require, no-undef
  require('smooth-scroll')('a[href*="#"]', {
    // integer or function returning an integer. How far to offset the scrolling anchor location in pixels
    offset: 40,
  })
}

const Layout = ({ children, showHero = false }) => (
  <ThemeProvider theme={theme}>
    <Lightbox>
      <Helmet title={config.title} />
      {showHero && <Hero />}
      <Navbar location={showHero && 'root'} />
      {children}
      <Footer />
      <GlobalStyle />
    </Lightbox>
  </ThemeProvider>
)

export default Layout
