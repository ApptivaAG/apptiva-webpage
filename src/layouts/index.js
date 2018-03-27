import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'

import Navbar from '../components/Navbar'
import { fontFace } from './font-face'
import { Container } from './style'

const theme = {
  color: { primary: '#008fd7', secondary: '#81d742' }
}

injectGlobal`
  ${styledNormalize}
  ${fontFace}

html {
  font-size: 20px;
}

body {
  font-family: Gentona, sans-serif;
}

a {
  text-decoration: none;
}

p {
  font-weight: 300;
}

`

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet title="Home | Gatsby + Netlify CMS" />
      <Navbar />
      {children()}
    </div>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
