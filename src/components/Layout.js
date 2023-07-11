import 'normalize.css/normalize.css'
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'

import { Provider as BalancerProvider } from 'react-wrap-balancer'
import config from '../config'
import '../fonts.css'
import { GlobalStyle, theme } from '../style'
import Footer from './Footer'
import Lightbox, { LightboxImageStyle } from './Lightbox'
import Navbar from './Navbar'

if (typeof window !== 'undefined') {
  // make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require, no-undef
  require('smooth-scroll')('a[href*="#"]', {
    // integer or function returning an integer. How far to offset the scrolling anchor location in pixels
    offset: 85,
  })
}

const Layout = ({ children, showHero = false }) => (
  <BalancerProvider>
    <ThemeProvider theme={theme}>
      <Lightbox>
        <Helmet title={config.title} />
        <Navbar location={showHero && 'root'} />
        {children}
        <Footer />
        <GlobalStyle />
        <LightboxImageStyle />
      </Lightbox>
    </ThemeProvider>
  </BalancerProvider>
)

export default Layout
