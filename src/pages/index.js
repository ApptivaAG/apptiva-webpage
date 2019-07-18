import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import {
  Title,
  Section,
  Button,
  Right,
  Container,
  ColList,
  ListItem,
  ImgStyled,
  DeemphasizedTitle,
} from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/BlogPreview'
import Customers from '../components/Customers'

import { ReactComponent as Botfabrik } from '../img/botfabrik.svg'
import swisscom from '../img/swisscom-gold-partner-300.png'

const BotfabrikLogo = styled(Botfabrik)`
  width: 70%;
  margin: 2em 0.6em;
`
const Buttonlist = styled(Right)`
  a {
    margin-top: 1em;
  }
  @media (min-width: 381px) {
    a {
      margin-left: 1em;
    }
  }
`
const Blockquote = styled.blockquote`
  margin-top: 4em;
  padding-bottom: 1em;
`

const PartnerImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 1em -1em;
  img {
    flex: 1 1 6em;
    width: 100%;
    max-width: 12em;
    height: 100%;
    padding: 1em;
  }
`

const IndexPage = ({ images }) => (
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
                  fluid={images.appsImage.childImageSharp.fluid}
                  alt="Apps"
                />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/chatbots/">
                <h3>Individuelle</h3>
                <h2>Chatbots</h2>
                <h4>Botfabrik by Apptiva</h4>
                <BotfabrikLogo />
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
                  fluid={images.partyplaner.childImageSharp.fluid}
                  alt="Angebots- und Produktkonfiguratoren"
                />
              </Link>
            </ListItem>
          </ColList>
          <h2>Weitere Angebote</h2>
          <ul>
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
          </ul>
          <Blockquote>
            <h3>Unsere Spezialität</h3>
            <p css="margin-bottom: 0">
              Das Erstellen von individuellen Softwarelösungen ist unsere
              Spezialität. Wir unterstützen Sie bei der digitalen Transformation
              Ihres Unternehmens und beschleunigen Ihre Geschäftsprozesse. Dazu
              setzen wir modernste Methoden und Technologien ein und liefern
              schlanke und passgenaue Lösungen: „Lean Enterprise Apps“. Unsere
              Apps füllen die Lücken, die Standardsoftware nicht füllen kann.
            </p>
            <Buttonlist>
              <Button to="/vorgehensweise">Unser Vorgehen</Button>
              <Button to="/unsere-kompetenzen">Unsere Kompetenzen</Button>
            </Buttonlist>
          </Blockquote>
        </Container>
      </Section>
      <Customers />
      <Testimonials />
      <BlogPreview />
      <Section>
        <Container>
          <DeemphasizedTitle>Partnerschaften</DeemphasizedTitle>
          <PartnerImage>
            <img src={swisscom} alt="Swisscom Gold Partner" />
          </PartnerImage>
        </Container>
      </Section>
    </main>
  </Layout>
)

export default ({ data }) => {
  return <IndexPage images={data} />
}

export const indexPageQuery = graphql`
  query IndexPage {
    appsImage: file(
      absolutePath: { regex: "/individuelle-entwicklung/apps.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    partyplaner: file(
      absolutePath: { regex: "/produktkonfiguratoren/partyplaner.png/" }
    ) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`
