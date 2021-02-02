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
      <Container>
        <Helmet title={`Apptiva Newsletter - ${config.company}`} />
        <SEO metaData={metadata} />

        <Section>
          <MainTitle>Apptiva Newsletter</MainTitle>
          <Img css="margin: 3em 0;" fluid={mail.childImageSharp.fluid} />
          <p css="font-size: 1.8em; padding: 0;">
            Bleiben Sie mit dem Apptiva Newsletter auf dem Laufenden.
          </p>
          <p>
            Der Apptiva Newsletter wird einmal pro Quartal verschickt mit den
            neuesten News rund um die Apptiva:
          </p>
          <ul>
            <li>Was unseren aktuellen Projekte sind.</li>
            <li>Welche Erkenntnisse wir gewonnen haben.</li>
            <li>Wie die Apptiva täglich besser wird.</li>
          </ul>
          <NewsletterForm />
        </Section>
      </Container>
    </Layout>
  )
}
export default Newsletter
