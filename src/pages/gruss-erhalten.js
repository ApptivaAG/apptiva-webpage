import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import { Centered, Container, Section } from '../style'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  {
    thankYou: file(
      absolutePath: { regex: "/dankeschoen.png/" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
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
          <GatsbyImage
            image={thankYou.childImageSharp.gatsbyImageData}
            css="margin: 2em 20%;"
          />
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
