import React from 'react'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import { Centered, Container, Section } from '../style'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query {
    thankYou: file(
      absolutePath: { regex: "/dankeschoen.png/" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1024, toFormat: JPG) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const ThankYou = () => {
  const { thankYou } = useStaticQuery(query)
  return (
    <Layout>
      <Container>
        {/* <Section css="padding-bottom: 0;">
          <MainTitle>Vielen Dank</MainTitle>
        </Section> */}
        <Section css="font-size: 1.8em;">
          <Img css="margin: 2em 20%;" fluid={thankYou.childImageSharp.fluid} />
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
