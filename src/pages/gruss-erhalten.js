import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import { Centered, Container, MainTitle, Section } from '../style'
import { Helmet } from 'react-helmet'

const ThankYou = () => {
  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Container>
        <Section css="padding-bottom: 0;">
          <MainTitle>Vielen Dank</MainTitle>
        </Section>
        <Section css="font-size: 1.8em;">
          <Centered css="padding: 0 1em;">
            <StaticImage src="../img/dankeschoen.png" width="400"></StaticImage>
          </Centered>

          <Centered>
            <p>
              Wir haben deinen Gruss erhalten.{' '}
              <span role="img" aria-label="blush emoji">
                😊
              </span>
            </p>
          </Centered>
        </Section>
      </Container>
    </Layout>
  )
}
export default ThankYou
