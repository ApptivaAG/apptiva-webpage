import React from 'react'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import { Container, MainTitle, Section } from '../style'
import SEO from '../components/SEO'
import config from '../config'
import NewsletterForm from '../components/NewsletterForm'
import { graphql, useStaticQuery } from 'gatsby'

const metadata = {
  title: 'Apptiva Newsletter',
  description: 'Bleiben Sie mit dem Apptiva Newsletter auf dem Laufenden.',
  slug: 'newsletter',
}

const Newsletter = () => {
  const { mail } = useStaticQuery(graphql`
    query {
      mail: file(
        absolutePath: { regex: "/mail9.png/" }
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Helmet title={`Apptiva Newsletter - ${config.company}`} />
      <SEO metaData={metadata} />

      <Section>
        <Container>
          <MainTitle>Apptiva Newsletter</MainTitle>
          <Img fluid={mail.childImageSharp.fluid} />
        </Container>
        <Container css="max-width: 600px;">
          <h2 css="margin-top: 0;">
            Bleiben Sie mit dem Apptiva Newsletter auf dem Laufenden.
          </h2>
          <p>
            Den Apptiva Newsletter versenden wir <b>einmal pro Quartal</b> mit
            News rund um die Apptiva:
          </p>
          <ul>
            <li>Umgesetzte Projekte</li>
            <li>Gewonnene Erkenntnisse</li>
            <li>Wie wir uns laufend verbessern</li>
          </ul>
          <p>Hört sich gut an?</p>
          <div css="margin-bottom: 4em;">
            <NewsletterForm />
          </div>
        </Container>
      </Section>
    </Layout>
  )
}
export default Newsletter
