import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import {
  Title,
  Section,
  Button,
  Container,
  Row,
  Col,
  ImgStyled,
  Buttonlist,
  Card,
  CardLinks,
} from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Testimonials from '../components/Testimonials'
import BlogPreview from '../components/BlogPreview'
import CallToAction from '../components/CallToAction'

const PartnerImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3em;
  align-items: center;
  justify-content: space-around;
`

const metadata = {
  title: 'Apptiva AG - iOS, Android, Desktop und Web-Applikationen',
  description: `Agile Entwicklung von iOS, Android, Desktop und Web-Applikationen. 
  Bei uns erhalten Sie passende, benutzerfreundliche Lösungen mit attraktivem Design in der Schweiz entwickelt.`,
}

const HomePageTemplate = ({
  partners,
  appsImage,
  chatbot,
  partyplaner,
  payflink,
  digitalisieren,
  support,
  bubbleChat,
}) => (
  <Layout showHero>
    <main>
      <SEO metaData={metadata} />
      <Section id="dienstleistungen">
        <Container>
          <Title>Dienst&shy;leistungen</Title>
          <Row>
            <Col>
              <Link to="/individuelle-entwicklung/">
                <Card>
                  <h3>Individuelle Entwicklung</h3>
                  <p>Apps für Mobile und Desktop</p>
                  <ImgStyled
                    image={appsImage.childImageSharp.gatsbyImageData}
                    alt="Apps"
                  />
                  <CardLinks>
                    <Link to="/mobile-apps-ios-android/">
                      <p>Mobile Apps für iOS und Android</p>
                    </Link>
                    <Link to="/web-apps/">
                      <p>Web Apps und Applikationen</p>
                    </Link>
                    <Link to="/custom-dashboard/">
                      <p>Individuelle Dashboards</p>
                    </Link>
                    <Link to="/einzigartiger-webshop/">
                      <p>Einzigartige Webshops</p>
                    </Link>
                    <Link to="/bargeldlos-bezahlen/">
                      <p>Bargeldlose Zahlungslösungen</p>
                    </Link>
                    <Link to="/weiterentwicklung-apps-produkte/">
                      <p>Weiterentwicklung von Produkten</p>
                    </Link>
                  </CardLinks>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/chatbots/">
                <Card>
                  <h3>Individuelle Chatbots</h3>
                  <p>Botfabrik by Apptiva</p>
                  <ImgStyled
                    image={chatbot.childImageSharp.gatsbyImageData}
                    alt="Chatbots"
                  />
                </Card>
              </Link>
              <Link to="/produktkonfiguratoren/">
                <Card>
                  <h3>Produkt-Konfiguratoren</h3>
                  <p>Komplexe Angebote einfach verkaufen</p>
                  <ImgStyled
                    image={partyplaner.childImageSharp.gatsbyImageData}
                    alt="Angebots- und Produktkonfiguratoren"
                  />
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to="/digitalisierung-unternehmen/">
                <Card>
                  <h3>Unternehmen digitalisieren</h3>
                  <p>Gemeinsam packen wir die Herausforderungen an.</p>
                  <ImgStyled
                    image={digitalisieren.childImageSharp.gatsbyImageData}
                    alt="Angebots- und Produktkonfiguratoren"
                  />
                </Card>
              </Link>
              <Link to="/unterstuetzung/">
                <Card>
                  <h3>Unterstützung</h3>
                  <p>Wir unterstützen Sie mit unserer Brainpower.</p>
                  <ImgStyled
                    image={support.childImageSharp.gatsbyImageData}
                    alt="Angebots- und Produktkonfiguratoren"
                  />
                </Card>
              </Link>
            </Col>
          </Row>
          <Title>Produkte</Title>
          <Row>
            <Col>
              <Link to="/payflink/">
                <Card>
                  <h3>Payflink</h3>
                  <p>Restaurant Bestell App & Digitale Speisekarte</p>
                  <ImgStyled
                    image={payflink.childImageSharp.gatsbyImageData}
                    alt="Payflink"
                  />
                </Card>
              </Link>
            </Col>
            <Col>
              <a href="https://bubble-chat.ch/">
                <Card>
                  <h3>Bubble Chat</h3>
                  <p>KI-basierte Chatbot Lösung</p>
                  <ImgStyled
                    image={bubbleChat.childImageSharp.gatsbyImageData}
                    alt="Bubble Chat"
                  />
                </Card>
              </a>
            </Col>
            <Col>
              <Link to="/einsatzplanung/">
                <h3>Einsatzplanung für den Gebäudeunterhalt</h3>
              </Link>
              <Link to="/dashboard-notaufnahme/">
                <h3>Dashboard für die Notaufnahme</h3>
              </Link>
              <Link to="/guestcounter/">
                <h3>Gästezähler</h3>
              </Link>
            </Col>
          </Row>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <h2>Unsere Spezialität</h2>
          <p css="margin-bottom: 0">
            Das Entwickeln von individuellen Apps und Applikationen ist unsere
            Spezialität. Damit beschleunigen wir Ihre Geschäftsprozesse und
            unterstützen Sie bei der digitalen Transformation Ihres
            Unternehmens. Wir pflegen eine enge und direkte Zusammenarbeit mit
            unseren Kunden, um schnell und in hoher Qualität passgenaue Lösungen
            bereitstellen zu können.
          </p>
          <Buttonlist>
            <Button to="/ueber-uns/">Mehr über uns erfahren</Button>
            <Button to="/vorgehen/">Unser Vorgehen</Button>
            <Button to="/unsere-kompetenzen/">Unsere Kompetenzen</Button>
          </Buttonlist>
        </Container>
      </Section>

      <Section>
        <Container>
          <Testimonials />
        </Container>
      </Section>

      <Section dark>
        <Container>
          <h2>Partner</h2>
          <PartnerImage>
            {partners.edges.map(({ node }) => (
              <Link key={node.id} to={`/${node.frontmatter.slug}/`}>
                <GatsbyImage
                  image={node.frontmatter.logo.childImageSharp.gatsbyImageData}
                  alt={node.frontmatter.name}
                />
              </Link>
            ))}
          </PartnerImage>
        </Container>
      </Section>

      <BlogPreview />
      <CallToAction dark />
    </main>
  </Layout>
)

const HomePage = ({
  data: {
    chatbot,
    partyplaner,
    appsImage,
    partners,
    payflink,
    digitalisieren,
    support,
    bubbleChat,
  },
}) => (
  <HomePageTemplate
    chatbot={chatbot}
    partyplaner={partyplaner}
    payflink={payflink}
    appsImage={appsImage}
    partners={partners}
    digitalisieren={digitalisieren}
    support={support}
    bubbleChat={bubbleChat}
  />
)

export default HomePage

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
                gatsbyImageData(width: 160, layout: FIXED)
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
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    partyplaner: file(
      absolutePath: { regex: "/produktkonfiguratoren/partyplaner.png/" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    chatbot: file(
      absolutePath: { regex: "/services/chatbots/chatbot-window.png/" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    payflink: file(
      absolutePath: { regex: "/services/payflink/payflink.png/" }
    ) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    digitalisieren: file(
      absolutePath: {
        regex: "/services/digitalisierung-unternehmen/digitalisieren.png/"
      }
    ) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    support: file(absolutePath: { regex: "/services/support/life-ring.png/" }) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
    bubbleChat: file(absolutePath: { regex: "/src/img/bubble-chat.png/" }) {
      childImageSharp {
        gatsbyImageData(height: 140, layout: CONSTRAINED)
      }
    }
  }
`
