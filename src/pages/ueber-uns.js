import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'

import { Container, Section, Buttonlist, Button, MainTitle } from '../style'
import { description, company, knowledgeRoute } from '../config'

import Layout from '../components/Layout'
import Employees from '../components/Employees'
import SEO from '../components/SEO'
import CallToAction from '../components/CallToAction'

const AboutUs = () => {
  const metadata = {
    title: 'Über uns',
    description,
    slug: 'ueber-uns',
  }

  return (
    <Layout>
      <Helmet title={`Über uns - ${company}`} />
      <SEO metaData={metadata} />
      <Section css="padding-bottom: 0;">
        <Container>
          <MainTitle>Über uns</MainTitle>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          <p>
            Seit 2015{' '}
            <a href="/mobile-apps-ios-android/">entwickeln wir Apps</a>,
            Applikationen und Chatbots. Uns ist es wichtig, die
            Herausforderungen unserer Kunden zu verstehen, um eine optimale
            Lösung in kurzer Zeit umsetzen zu können. Dies erreichen wir unter
            anderem dank unserem benutzerzentrierten Vorgehen.
          </p>
          <p>
            In allen Projekten pflegen wir den engen und direkten Kontakt mit
            unseren Kunden. Während der ganzen Projektdauer haben unsere Kunden
            dieselbe Ansprechperson. Zudem findet die gesamte Entwicklung in der
            Schweiz bei Apptiva statt.
          </p>
          <Buttonlist>
            <Button to="/ueber-uns/#team">Unser Team</Button>
            <Button to={`/${knowledgeRoute}/`}>Apptiva lernt</Button>
            <Button to="/vorgehen/">Unser Vorgehen</Button>
            <Button to="/unsere-kompetenzen/">Unsere Kompetenzen</Button>
          </Buttonlist>
          <StaticImage style={{ marginTop: 40 }} src="../img/team.webp" />
        </Container>
      </Section>
      <Section dark>
        <Container>
          <h2>Vorteil Apptiva</h2>
          <p>
            Mit der Apptiva haben Sie einen Partner, welcher unkompliziert und
            erfolgreich mit Ihnen zusammenarbeitet. Wir konnten bis jetzt jedes
            Projekt gemeinsam mit unseren Kunden erfolgreich lancieren und
            betreiben. Unsere Projekte sind aber nicht bloss zeitgerecht und im
            Budget, sondern kommen auch bei den Anwendern sehr gut an.
          </p>
          <Buttonlist>
            <Button to="/zusammenarbeit/">Ihr Vorteil mit Apptiva</Button>
          </Buttonlist>
        </Container>
      </Section>
      <StaticImage src="../img/buero.jpg" alt="Unser Büro" />
      <Employees />
      <CallToAction />
    </Layout>
  )
}

export default AboutUs
