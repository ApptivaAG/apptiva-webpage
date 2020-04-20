import React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { Container, Section, Buttonlist, Button, MainTitle } from '../style'
import { description, company } from '../config'

import Layout from '../components/Layout'
import Employees from '../components/Employees'
import SEO from '../components/SEO'

const query = graphql`
  query {
    officeImage: file(
      absolutePath: { regex: "/buero.jpg/" }
      sourceInstanceName: { eq: "images" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

const AboutUs = ({ location }) => {
  const metadata = {
    title: 'Über uns',
    description: 'Wer ist die Botfabrik?',
    slug: location.pathname,
  }
  const { officeImage } = useStaticQuery(query)

  return (
    <Layout>
      <main>
        <Helmet title={`Über uns - ${company}`} />
        <SEO metaData={metadata} />
        <Section>
          <Container>
            <MainTitle>Über uns</MainTitle>
            <p>{description}</p>
            <p>
              Seit 2015 entwickeln wir Apps, Applikationen und Chatbots. Dabei
              achten wir auf eine agile Vorgehensweise, technisch hochwertige
              Resultate und benutzerfreundliche Lösungen.
            </p>
            <p>
              Uns ist es wichtig die Herausforderungen unserer Kunden zu
              verstehen, um eine optimale Lösung in kurzer Zeit umsetzen zu
              können. Dies erreichen wir unter anderem dank unserem
              benutzerzentrierten Vorgehen.
            </p>
            <p>
              In allen Projekten pflegen wir den engen und direkt Kontakt mit
              unseren Kunden. Unsere Kunden haben während der ganzen
              Projektdauer von Anfang bis Schluss dieselbe Ansprechsperson.
              Zudem findet alle Entwicklung in der Schweiz mit unseren eigenen
              Entwicklern statt.
            </p>
            <Buttonlist>
              <Button to="/vorgehensweise">Unser Vorgehen</Button>
              <Button to="/unsere-kompetenzen">Unsere Kompetenzen</Button>
            </Buttonlist>
          </Container>
        </Section>
        <Section dark>
          <Container>
            <h2>Vorteil Apptiva</h2>
            <p>
              Mit der Apptiva haben Sie einen Partner, welcher unkompliziert und
              erfolgreich mit Ihnen zusammenarbeitet. Wir konnten bis jetzt
              jedes Projekt gemeinsam mit unseren Kunden erfolgreich lancieren
              und betreiben. Unsere Projekte sind aber nicht bloss zeitgerecht
              und im Budget, sondern kommen auch bei den Anwendern sehr gut an.
              Wir achten von Beginn an auf eine gute Usability.
            </p>
            <Buttonlist>
              <Button to="/zusammenarbeit">Ihr Vorteil mit Apptiva</Button>
            </Buttonlist>
          </Container>
        </Section>
        <Img fluid={officeImage.childImageSharp.fluid} />
        <Employees />
      </main>
    </Layout>
  )
}

export default AboutUs
