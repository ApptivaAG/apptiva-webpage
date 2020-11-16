import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import {
  Title,
  Section,
  Button,
  Container,
  ColList,
  ListItem,
  ImgStyled,
  DeemphasizedTitle,
  Buttonlist,
} from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/BlogPreview'
import Customers from '../components/Customers'
import CallToAction from '../components/CallToAction'

const Blockquote = styled.blockquote`
  margin-top: 4em;
  padding-bottom: 1em;
`
const PartnerImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;

  a {
    margin: 2em;
  }
`

const IndexPage = ({ partners, appsImage, chatbot, partyplaner }) => (
  <Layout showHero>
    <main>
      <SEO />
      <Section id="dienstleistungen">
        <Container>
          <Title>Dienst&shy;leistungen</Title>
          <ColList>
            <ListItem>
              <Link to="/individuelle-entwicklung/">
                <h3>Individuelle Entwicklung</h3>
                <h2>App-Lösungen</h2>
                <h4>Mobile und Desktop</h4>
                <ImgStyled
                  style={{ width: '100%', marginTop: '2rem' }}
                  fluid={appsImage.childImageSharp.fluid}
                  alt="Apps"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/chatbots/">
                <h3>Individuelle</h3>
                <h2>Chatbots</h2>
                <h4>Botfabrik by Apptiva</h4>
                <ImgStyled
                  fluid={chatbot.childImageSharp.fluid}
                  alt="Chatbots"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/produktkonfiguratoren/">
                <h2>
                  Produkt-
                  <br />
                  Konfiguratoren
                </h2>
                <h4>Komplexe Angebote einfach verkaufen</h4>
                <ImgStyled
                  fluid={partyplaner.childImageSharp.fluid}
                  alt="Angebots- und Produktkonfiguratoren"
                />
              </Link>
            </ListItem>
          </ColList>
          <h2>Weitere Angebote</h2>
          <ul>
            <li>
              <Link to="/digitalisierung-unternehmen-corona">
                <h3>Unternehmen digitalisieren</h3>
              </Link>
            </li>
            <li>
              <Link to="/dashboard-notaufnahme/">
                <h3>Dashboard für die Notaufnahme</h3>
              </Link>
            </li>
            <li>
              <Link to="/unterstuetzung">
                <h3>Erstklassige Unterstützung</h3>
              </Link>
            </li>
            <li>
              <Link to="/einsatzplanung">
                <h3>Einsatzplanung für den Gebäudeunterhalt</h3>
              </Link>
            </li>
            <li>
              <Link to="/future-hack-digitalisierung-gemeinsam-anpacken">
                <h3>Future Hack - Digitalisierung gemeinsam anpacken</h3>
              </Link>
            </li>
          </ul>
          <Blockquote>
            <h3>Unsere Spezialität</h3>
            <p css="margin-bottom: 0">
              Das Entwickeln von individuellen Apps und Applikationen ist unsere
              Spezialität. Damit beschleunigen wir Ihre Geschäftsprozesse und
              unterstützen Sie bei der digitalen Transformation Ihres
              Unternehmens. Wir pflegen eine enge und direkte Zusammenarbeit mit
              unseren Kunden, um schnell und in hoher Qualität passgenaue
              Lösungen bereitstellen zu können.
            </p>
            <Buttonlist>
              <Button to="/ueber-uns">Mehr über uns erfahren</Button>
              <Button to="/vorgehensweise">Unser Vorgehen</Button>
              <Button to="/unsere-kompetenzen">Unsere Kompetenzen</Button>
            </Buttonlist>
          </Blockquote>
        </Container>
      </Section>
      <CallToAction dark />

      <Customers />
      <Testimonials />
      <BlogPreview />
      <Section dark>
        <Container>
          <DeemphasizedTitle>Partner</DeemphasizedTitle>
          <PartnerImage>
            {partners.edges.map(({ node }) => {
              return (
                <Link key={node.id} to={node.frontmatter.slug}>
                  <Img
                    fixed={node.frontmatter.logo.childImageSharp.fixed}
                    alt={node.frontmatter.name}
                  />
                </Link>
              )
            })}
          </PartnerImage>
        </Container>
      </Section>
      <CallToAction />
    </main>
  </Layout>
)

export default ({ data: { chatbot, partyplaner, appsImage, partners } }) => {
  return (
    <IndexPage
      chatbot={chatbot}
      partyplaner={partyplaner}
      appsImage={appsImage}
      partners={partners}
    />
  )
}

export const indexPageQuery = graphql`
  query IndexPage {
    partners: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___prio] }
      filter: { frontmatter: { templateKey: { eq: "partner-page" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            url
            slug
            logo {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
    appsImage: file(
      absolutePath: { regex: "/individuelle-entwicklung/apps.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    partyplaner: file(
      absolutePath: { regex: "/produktkonfiguratoren/partyplaner.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    chatbot: file(
      absolutePath: { regex: "/services/chatbots/chatbot-screen2.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
