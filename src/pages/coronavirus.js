import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { MainTitle, Container, Subtitle, Button, Section } from '../style'
import SEO from '../components/SEO'
import config from '../config'
import Layout from '../components/Layout'

const metadata = {
  title: 'Coronavirus',
  description: 'So geht die Apptiva mit COVID-19 um',
  slug: 'coronavirus',
}

const Center = styled.div`
  text-align: center;
  padding-top: 1em;
`

export default () => (
  <Layout>
    <main>
      <Helmet title={`${metadata.title} - ${config.company}`} />
      <SEO metaData={metadata} />
      <MainTitle>{metadata.title}</MainTitle>
      <Subtitle>{metadata.description}</Subtitle>
      <Section css="margin-top: 3em;">
        <Container>
          <h2>Status bei Apptiva</h2>

          <ul>
            <li>
              <h3>Projekte werden normal bearbeitet</h3>
              <br /> Alle Projekte werden normal bearbeitet. Der Coronavirus
              hindert uns in keiner Weise an unserer Arbeit.
            </li>
          </ul>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <h2>Unsere Massnahmen</h2>

          <p>
            Damit wir auch in Zeiten des Coronavirus&apos; leistungs- und
            reaktionsfähig bleiben, haben wir seit dem 8. März 2020
            unterschiedliche Massnahmen ergriffen:
          </p>
          <ul>
            <li>
              <h3>Home-Office</h3>
              <br />
              Soweit möglich arbeiten wir zuhause. Dies tangiert uns kaum in
              unserer Arbeit. Wir haben das Telefon umgeleitet und sind so zu
              Bürozeiten immer noch unter 041 322 26 26 erreichbar. Wir freuen
              uns auf ihren Anruf.
            </li>
            <li>
              <h3>Remote-Meetings</h3>
              <br />
              Wir führen alle Meetings remote durch. Nur in Ausnahmefällen
              treffen wir unsere Kunden in persona.
            </li>
            <li>
              <h3>Befolgen der BAG-Regeln</h3>
              <br />
              Wir befolgen die{' '}
              <a href="https://bag-coronavirus.ch/">
                Verhaltens- und Hygieneregeln
              </a>{' '}
              des BAGs. Die entsprechenden Regeln sind bei uns in den
              Räumlichkeiten aufgehängt.
            </li>
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2>Fragen</h2>

          <p>Bei Fragen stehen wir jederzeit zur Verfügung.</p>

          <Center>
            <Button to="/#kontakt">Frage stellen</Button>
          </Center>
        </Container>
      </Section>
    </main>
  </Layout>
)
