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
  font-family: Gentona, sans-serif;
  font-weight: 200;
}

p {
  line-height: 1.3;
}

a {
  text-decoration: none;
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

`

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet title="Home | Gatsby + Netlify CMS" />
      <Navbar />
      <Container>{children()}</Container>
    </div>
  </ThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
